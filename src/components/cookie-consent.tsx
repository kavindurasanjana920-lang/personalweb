"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronDown, Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsentState {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  decided: boolean;
}

const CONSENT_KEY = "cookie_consent_v1";

function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full bg-background shadow-sm transition-transform duration-200",
          checked ? "translate-x-[18px]" : "translate-x-[3px]"
        )}
      />
    </button>
  );
}

const categories = [
  {
    key: "necessary" as const,
    label: "Necessary",
    description:
      "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.",
    alwaysActive: true,
  },
  {
    key: "functional" as const,
    label: "Functional",
    description:
      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
    alwaysActive: false,
  },
  {
    key: "analytics" as const,
    label: "Analytics",
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
    alwaysActive: false,
  },
];

export function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [settled, setSettled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [prefs, setPrefs] = useState({ functional: false, analytics: false });

  useEffect(() => {
    const saved = loadConsent();
    if (!saved?.decided) {
      setBannerVisible(true);
    }
    setSettled(true);
  }, []);

  function acceptAll() {
    saveConsent({ necessary: true, functional: true, analytics: true, decided: true });
    setBannerVisible(false);
    setShowPreferences(false);
  }

  function rejectAll() {
    saveConsent({ necessary: true, functional: false, analytics: false, decided: true });
    setBannerVisible(false);
    setShowPreferences(false);
  }

  function saveMyPreferences() {
    saveConsent({ necessary: true, ...prefs, decided: true });
    setBannerVisible(false);
    setShowPreferences(false);
  }

  function openSettings() {
    const saved = loadConsent();
    if (saved) {
      setPrefs({ functional: saved.functional, analytics: saved.analytics });
    }
    setShowPreferences(true);
    setBannerVisible(true);
  }

  if (!settled) return null;

  return (
    <>
      {/* Re-open button after consent is decided */}
      {!bannerVisible && (
        <button
          type="button"
          onClick={openSettings}
          aria-label="Cookie Settings"
          className="fixed bottom-6 left-4 z-[150] flex items-center justify-center size-9 rounded-full bg-card border border-border text-muted-foreground shadow-md hover:text-foreground hover:bg-accent transition-colors"
        >
          <Cookie className="size-4" />
        </button>
      )}

      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <AnimatePresence mode="wait">
              {!showPreferences ? (
                /* ── Main consent banner ── */
                <motion.div
                  key="banner"
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="bg-card border border-border rounded-2xl shadow-2xl max-w-[340px] w-full p-6 flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-3">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                      We value your privacy
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We use cookies to enhance your browsing experience, serve
                      personalised ads or content, and analyse our traffic. By
                      clicking &quot;Accept All&quot;, you consent to our use of
                      cookies.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="w-full py-2 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      Customise
                    </button>
                    <button
                      onClick={rejectAll}
                      className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={acceptAll}
                      className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Accept All
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── Customise Preferences panel ── */
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full flex flex-col max-h-[90vh]"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
                    <h2 className="text-sm font-semibold tracking-tight text-foreground">
                      Customise Consent Preferences
                    </h2>
                    <button
                      onClick={() => setShowPreferences(false)}
                      aria-label="Back"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {/* Scrollable body */}
                  <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We use cookies to help you navigate efficiently and perform
                      certain functions. Detailed information about all cookies
                      is listed under each category below.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Cookies categorised as &quot;Necessary&quot; are stored on
                      your browser as they are essential for the basic
                      functionalities of the site. We also use third-party
                      cookies that will only be stored with your prior consent.
                    </p>

                    {/* Category rows */}
                    <div className="flex flex-col gap-2 mt-1">
                      {categories.map((cat) => (
                        <div
                          key={cat.key}
                          className="border border-border rounded-xl overflow-hidden"
                        >
                          <div className="flex items-center justify-between px-4 py-3">
                            <button
                              type="button"
                              onClick={() =>
                                setExpanded(
                                  expanded === cat.key ? null : cat.key
                                )
                              }
                              className="flex items-center gap-2 text-sm font-medium text-foreground text-left"
                            >
                              {expanded === cat.key ? (
                                <ChevronDown className="size-3.5 flex-shrink-0 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="size-3.5 flex-shrink-0 text-muted-foreground" />
                              )}
                              {cat.label}
                            </button>

                            {cat.alwaysActive ? (
                              <span className="text-xs font-medium text-foreground/60 bg-muted rounded-md px-2 py-0.5 flex-shrink-0">
                                Always Active
                              </span>
                            ) : (
                              <Toggle
                                checked={
                                  prefs[cat.key as keyof typeof prefs] ?? false
                                }
                                onChange={(v) =>
                                  setPrefs((p) => ({ ...p, [cat.key]: v }))
                                }
                              />
                            )}
                          </div>

                          <AnimatePresence initial={false}>
                            {expanded === cat.key && (
                              <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                className="overflow-hidden"
                              >
                                <p className="px-4 pb-4 pt-2 text-xs text-muted-foreground leading-relaxed border-t border-border">
                                  {cat.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer buttons */}
                  <div className="px-5 py-4 border-t border-border flex flex-col sm:flex-row gap-2 flex-shrink-0">
                    <button
                      onClick={rejectAll}
                      className="flex-1 py-2 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={saveMyPreferences}
                      className="flex-1 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                      Save Preferences
                    </button>
                    <button
                      onClick={acceptAll}
                      className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Accept All
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
