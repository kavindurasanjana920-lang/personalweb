#!/usr/bin/env bash
#
# Prepares GitHub Actions to deploy to the VM:
#   - an Entra ID app registration with federated credentials (no stored passwords)
#   - a Contributor role assignment scoped to the VM's resource group, which is what
#     lets the workflows read the VM's public IP and open/close the SSH NSG rule
#   - a dedicated CI SSH keypair
#
# Run once, after `az login`.
#
#     bash deploy/vm/azure-oidc-setup.sh
#
set -euo pipefail

############################  SETTINGS  ########################################
RESOURCE_GROUP="${RESOURCE_GROUP:-Primary}"
GITHUB_REPO="${GITHUB_REPO:-kavindurasanjana920-lang/personalweb}"
FRONTEND_BRANCH="${FRONTEND_BRANCH:-azure-vm}"
BACKEND_BRANCH="${BACKEND_BRANCH:-azure-vm-backend}"
AAD_APP_NAME="${AAD_APP_NAME:-gh-thekavindu-vm-deploy}"
KEY_PATH="${KEY_PATH:-$HOME/.ssh/thekavindu_ci}"
################################################################################

SUBSCRIPTION_ID="$(az account show --query id -o tsv)"
TENANT_ID="$(az account show --query tenantId -o tsv)"

echo "==> Subscription ${SUBSCRIPTION_ID}, resource group ${RESOURCE_GROUP}"

echo "==> App registration"
APP_ID="$(az ad app create --display-name "$AAD_APP_NAME" --query appId -o tsv)"
az ad sp create --id "$APP_ID" -o none 2>/dev/null || true
sleep 20   # let the service principal replicate before assigning the role

# Contributor on just this resource group. The workflows need to read the VM
# (az vm show) and create/delete NSG rules; nothing outside the group is in scope.
az role assignment create \
  --assignee "$APP_ID" \
  --role Contributor \
  --scope "/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}" -o none

add_federated_credential() {
  local cred_name="$1" cred_subject="$2" tmp
  tmp="$(mktemp)"
  cat > "$tmp" <<JSON
{
  "name": "${cred_name}",
  "issuer": "https://token.actions.githubusercontent.com",
  "subject": "${cred_subject}",
  "audiences": ["api://AzureADTokenExchange"]
}
JSON
  az ad app federated-credential create --id "$APP_ID" --parameters "@${tmp}" -o none
  rm -f "$tmp"
}

echo "==> Federated credentials"
# Both deploy jobs declare `environment: production`, so GitHub mints a token whose
# subject names the environment. The branch subjects are fallbacks in case that key
# is removed from the workflows.
add_federated_credential "github-env-production" "repo:${GITHUB_REPO}:environment:production"
add_federated_credential "github-branch-frontend" "repo:${GITHUB_REPO}:ref:refs/heads/${FRONTEND_BRANCH}"
add_federated_credential "github-branch-backend" "repo:${GITHUB_REPO}:ref:refs/heads/${BACKEND_BRANCH}"

echo "==> CI SSH keypair"
if [[ -f "$KEY_PATH" ]]; then
  echo "    ${KEY_PATH} already exists - reusing it"
else
  ssh-keygen -t ed25519 -f "$KEY_PATH" -N "" -C "github-actions@thekavindu"
fi

cat <<SUMMARY

============================================================================
Add these GitHub repository SECRETS
(Settings > Secrets and variables > Actions):

  AZURE_CLIENT_ID          = ${APP_ID}
  AZURE_TENANT_ID          = ${TENANT_ID}
  AZURE_SUBSCRIPTION_ID    = ${SUBSCRIPTION_ID}
  CONTACT_FORM_WEBHOOK_URL = <your Make.com hook URL>
  VM_SSH_PRIVATE_KEY       = the full contents of ${KEY_PATH}

Then authorise the CI key on the VM:

  ssh -i ~/.ssh/PrimaryMachine_key.pem azureuser@<vm ip> \\
    "echo '$(cat "${KEY_PATH}.pub")' | sudo tee -a /home/deploy/.ssh/authorized_keys"

Note: the workflows open port 22 to the runner only for the duration of a deploy,
so you can keep the standing SSH rule locked to your own address.
============================================================================
SUMMARY
