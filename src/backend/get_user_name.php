<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

// Renvoyer les données de session si elles existent
if (isset($_SESSION['nom']) || isset($_SESSION['prenom'])) {
    echo json_encode([
        "success" => true,
        "nom" => $_SESSION['nom'] ?? '',
        "prenom" => $_SESSION['prenom'] ?? ''
    ]);
} else {
    // Sinon, renvoyer un message d'erreur
    echo json_encode([
        "success" => false,
        "message" => "Utilisateur non connecté"
    ]);
}
?>

