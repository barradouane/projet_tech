<?php
// Prevent PHP warnings from breaking JSON output
ini_set('display_errors', 0);
error_reporting(E_ERROR);

session_start(); // Démarrer la session

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email, $data->password)) {
    die(json_encode(["error" => "Tous les champs sont requis."]));
}

$email = strtolower(trim($data->email));
$password = $data->password;

// Comptes spéciaux
$adminEmail = "admin@eilco.etu.univ-littoral.fr";
$adminPass = "admineilco123";

$editorEmail = "editeur@eilco.etu.univ-littoral.fr";
$editorPass = "editeureilco123";

if ($email === $adminEmail && $password === $adminPass) {
    // Pour les comptes spéciaux, on peut initialiser quelques variables de session (valeurs par défaut ou spécifiques)
    $_SESSION['id'] = null; // Pas d'ID défini dans la base
    $_SESSION['nom'] = "Admin";
    $_SESSION['prenom'] = "";
    $_SESSION['site'] = "admin";
    die(json_encode(["success" => "Connexion réussie.", "role" => "admin"]));
}

if ($email === $editorEmail && $password === $editorPass) {
    $_SESSION['id'] = null; // Pas d'ID défini dans la base
    $_SESSION['nom'] = "Editeur";
    $_SESSION['prenom'] = "";
    $_SESSION['site'] = "editor";
    die(json_encode(["success" => "Connexion réussie.", "role" => "editor"]));
}

// Vérifier l'utilisateur normal
// Modification de la requête pour récupérer email_verified en plus des autres champs
$stmt = $pdo->prepare("SELECT id, nom, prenom, site, password, email_verified FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    die(json_encode(["error" => "Email ou mot de passe incorrect."]));
}

if (!password_verify($password, $user['password'])) {
    die(json_encode(["error" => "Email ou mot de passe incorrect."]));
}

// Vérifier si l'email est vérifié (seulement pour les utilisateurs normaux)
if (isset($user['email_verified']) && $user['email_verified'] != 1) {
    die(json_encode([
        "error" => "Veuillez vérifier votre email avant de vous connecter.",
        "unverified" => true,
        "email" => $email
    ]));
}

// Initialisation de la session avec les données de l'utilisateur
$_SESSION['id'] = $user['id'];
$_SESSION['nom'] = $user['nom'];
$_SESSION['prenom'] = $user['prenom'];
$_SESSION['site'] = $user['site'];

die(json_encode(["success" => "Connexion réussie.", "site" => $user['site']]));
?>