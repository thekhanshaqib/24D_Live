<?php
header('Content-Type: application/json');

// Read incoming JSON body
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$fullName    = isset($data['fullName'])     ? trim($data['fullName'])     : '';
$email       = isset($data['email'])        ? trim($data['email'])        : '';
$phone       = isset($data['phone'])        ? trim($data['phone'])        : '';
$propertyType = isset($data['propertyType']) ? trim($data['propertyType']) : '';

if (empty($fullName) || empty($email) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// ── Leadrat CRM ──────────────────────────────────────────────
$leadrat_api_key = 'NDM3ZmRjMWQtNjczYS00MTEyLWE2ZDctMGFlZDNlZGMyNGNm';
$leadrat_url     = 'https://connect.leadrat.com/api/v1/integration/Website';

// Build payload as an array with one lead object
$payload = [
    [
        'name'         => $fullName,
        'email'        => $email,
        'countryCode'  => '91',
        'mobile'       => $phone,
        'propertyType' => $propertyType,   // e.g. Residential / Commercial / Plots
        'notes'        => 'Enquiry via website' . ($propertyType ? ' | Property Type: ' . $propertyType : ''),
        'source'       => 'Website',
        'submittedDate' => date('d-m-y'),
        'submittedTime' => date('H:i:s'),

        // UTM params (populated if JS forwards them)
        'CampaignName' => isset($data['utm_campaign'])  ? $data['utm_campaign']  : '',
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,            $leadrat_url);
curl_setopt($ch, CURLOPT_HTTPHEADER,     [
    'API-Key: '      . $leadrat_api_key,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST,           1);
curl_setopt($ch, CURLOPT_POSTFIELDS,     json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_TIMEOUT,        30);

$data_resp  = curl_exec($ch);
$curl_errno = curl_errno($ch);
$curl_err   = curl_error($ch);
$http_code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($curl_errno) {
    echo json_encode(['success' => false, 'message' => 'CRM request failed: ' . $curl_err]);
    exit;
}

$crm_response = json_decode($data_resp, true);

if ($http_code >= 200 && $http_code < 300) {
    echo json_encode(['success' => true, 'message' => 'Submitted to CRM', 'crm' => $crm_response]);
} else {
    echo json_encode(['success' => false, 'message' => 'CRM returned HTTP ' . $http_code, 'response' => $data_resp]);
}
?>