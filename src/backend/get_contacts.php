<?php
session_start();
include 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Get the site from the request
$site = $_GET['site'] ?? $_SESSION['site'] ?? null;

if (!$site) {
    echo json_encode(["success" => false, "message" => "Site is required."]);
    exit;
}

// Prepare the SQL query with filters
$sql = "SELECT * FROM contacts WHERE site = :site";
$params = ['site' => $site];

if (!empty($_GET['service'])) {
    $sql .= " AND service = :service";
    $params['service'] = $_GET['service'];
}

if (!empty($_GET['niveau'])) {
    $sql .= " AND niveau_de_formation = :niveau";
    $params['niveau'] = $_GET['niveau'];
}

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "contacts" => $contacts
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => 'Error: ' . $e->getMessage()
    ]);
}
?>
