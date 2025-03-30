<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/db.php';

if (isset($_SESSION['user_id'])) {
    $stmt = $pdo->prepare("UPDATE utilisateurs SET session_active = 0 WHERE id = :id");
    $stmt->execute([':id' => $_SESSION['user_id']]);
}

$_SESSION = [];
if (ini_get("session.use_cookies")) {
    setcookie(session_name(), "", time() - 3600, "/");
}
session_destroy();

echo json_encode(["success" => "Déconnecté avec succès"]);
?>
