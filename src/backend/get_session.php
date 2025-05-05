<?php
session_start();

// Configurer les cookies de session pour qu'ils fonctionnent avec React
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', 'true');

// Autoriser les requêtes de n'importe quelle origine pendant le développement
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Gérer les requêtes OPTIONS (pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Déboguer la session
error_log("Session ID: " . session_id());
error_log("Session Data: " . print_r($_SESSION, true));

// Si l'utilisateur est connecté, renvoyer ses informations
if (isset($_SESSION['nom']) || isset($_SESSION['prenom'])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $_SESSION['id'] ?? null,
            "nom" => $_SESSION['nom'] ?? '',
            "prenom" => $_SESSION['prenom'] ?? '',
            "site" => $_SESSION['site'] ?? null
        ]
    ]);
} else {
    // Sinon, renvoyer une erreur
    echo json_encode([
        "success" => false,
        "message" => "Utilisateur non connecté",
        "session_id" => session_id(),
        "session_data" => $_SESSION
    ]);
}
?>

