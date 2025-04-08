<?php
session_start();

// Vider les variables de session
$_SESSION = [];

// Supprimer le cookie de session si nécessaire
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Détruire la session
session_destroy();

// Configuration des en-têtes CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // Autoriser localhost:3000
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Allow-Credentials: true"); // Important pour les cookies

// Gérer la requête OPTIONS (préflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Répondre avec un JSON
header("Content-Type: application/json");
echo json_encode(["success" => "Déconnexion réussie."]);
?>