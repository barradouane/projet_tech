<?php
header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portail_etudiant"; 
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Échec de connexion à la base de données."]));
}


if (!isset($_GET['token']) || empty($_GET['token'])) {
    http_response_code(400);
    die(json_encode(["error" => "Token manquant."]));
}

$verification_token = $_GET['token'];


$stmt = $conn->prepare("SELECT id FROM utilisateurs WHERE verification_token = ? AND verified = 0");
$stmt->bind_param("s", $verification_token);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    http_response_code(400);
    die(json_encode(["error" => "Token invalide ou compte déjà vérifié."]));
}
$stmt->close();

$stmt = $conn->prepare("UPDATE utilisateurs SET verified = 1, verification_token = NULL WHERE verification_token = ?");
$stmt->bind_param("s", $verification_token);

if ($stmt->execute()) {
    echo json_encode(["success" => "Votre compte a été vérifié avec succès !"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la mise à jour du compte."]);
}

$stmt->close();
$conn->close();
?>
