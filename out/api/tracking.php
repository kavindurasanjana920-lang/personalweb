<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$waybillId = isset($_GET['waybill_id']) ? trim($_GET['waybill_id']) : '';
if ($waybillId === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing waybill_id parameter'
    ]);
    exit;
}

$targetUrl = 'https://api.consumer.oms.parallaxtec.dev/api/tracking?waybill_id=' . rawurlencode($waybillId);

$ch = curl_init($targetUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 20,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json'
    ],
]);

$responseBody = curl_exec($ch);
$curlError = curl_error($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($responseBody === false) {
    http_response_code(502);
    echo json_encode([
        'success' => false,
        'error' => $curlError !== '' ? $curlError : 'Upstream request failed'
    ]);
    exit;
}

if ($httpCode >= 400) {
    http_response_code($httpCode);
    echo $responseBody;
    exit;
}

echo $responseBody;
