<?php
// Prevent PHP warnings from breaking output
ini_set('display_errors', 0);
error_reporting(E_ERROR);

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

require 'db.php';

if (!isset($_GET['token']) || empty($_GET['token'])) {
    echo "Token de vérification manquant.";
    exit;
}

$token = $_GET['token'];

// Vérifier si le token existe
$stmt = $pdo->prepare("SELECT id FROM users WHERE verification_token = ?");
$stmt->execute([$token]);

if ($stmt->rowCount() === 0) {
    echo "Token de vérification invalide ou déjà utilisé.";
    exit;
}

// Mettre à jour le statut de vérification de l'utilisateur
$updateStmt = $pdo->prepare("UPDATE users SET email_verified = 1, verification_token = NULL WHERE verification_token = ?");

if ($updateStmt->execute([$token])) {
    // Rediriger vers la page de connexion avec un message de succès
    header("Location: http://localhost:3000?verified=true");
    exit;
} else {
    echo "Une erreur s'est produite lors de la vérification de votre email.";
    exit;
}
?>