<?php
header('Content-Type: application/json');

// Read incoming JSON body
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// Required fields validation
$requiredFields = ['name', 'mobile', 'email', 'reraNumber'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Dynamic Date and Time
$currentDate = date('Y-m-d');
$currentTime = date('H:i:s');

// Value mapping with fallbacks to empty strings
$fullName = $data['name'] ?? '';
$agencyName = $data['agencyName'] ?? '';
$mobile = $data['mobile'] ?? '';
$email = $data['email'] ?? '';
$city = $data['city'] ?? '';
$designation = ''; // Explicitly blank per requirements
$state = ''; // Explicitly blank per requirements

// Additional Properties grouping
$additionalProperties = [
    'ReraNumber' => $data['reraNumber'] ?? '',
    'GST' => $data['gst'] ?? '',
    'Experience' => $data['experience'] ?? '',
    'MicroMarkets' => $data['microMarkets'] ?? '',
    'ClientType' => $data['clientType'] ?? '',
    'CurrentProjects' => $data['currentProjects'] ?? '',
    'LeadSource' => $data['leadSource'] ?? ''
];

// Construct Final Payload Structure
$lead = [
    "name" => $fullName,
    "ChannelPartnerName" => $fullName,
    "agencyName" => $agencyName,
    "mobile" => $mobile,
    "email" => $email,
    "city" => $city,
    "state" => $state,
    "location" => "",
    "budget" => "",
    "project" => "",
    "property" => "",
    "propertyType" => "",
    "leadExpectedBudget" => "",
    "submittedDate" => $currentDate,
    "submittedTime" => $currentTime,
    "notes" => "",
    "primaryUser" => "",
    "secondaryUser" => "",
    "CampaignName" => "",
    "leadStatus" => "Schedule Site Visit",
    "additionalProperties" => $additionalProperties
];

$payload = [$lead]; // Request body must be an array with a single object

$url = 'https://connect.leadrat.com/api/v1/integration/Website';
$api_key = 'ZmQ4OWU5NTYtNzIzZS00MTQ3LWEwOTktMDJiNTA3NjE2Yjgx';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "API-Key: $api_key",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$data_resp = curl_exec($ch);
$curl_errno = curl_errno($ch);
$curl_err = curl_error($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($curl_errno) {
    echo json_encode(['success' => false, 'message' => 'CRM request failed: ' . $curl_err]);
    exit;
}

// Attempt to decode CRM response
$crm_response = json_decode($data_resp, true);

if ($http_code >= 200 && $http_code < 300) {
    echo json_encode(['success' => true, 'message' => 'Registration successful', 'crm' => $crm_response]);
} else {
    echo json_encode(['success' => false, 'message' => 'CRM returned error', 'http_code' => $http_code, 'response' => $data_resp]);
}
?>