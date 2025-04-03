<?php
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
    die(json_encode(["success" => "Connexion réussie.", "role" => "admin"]));
}

if ($email === $editorEmail && $password === $editorPass) {
    die(json_encode(["success" => "Connexion réussie.", "role" => "editor"]));
}

// Vérifier l'utilisateur normal
$stmt = $pdo->prepare("SELECT site, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    die(json_encode(["error" => "Email ou mot de passe incorrect."]));
}

if (!password_verify($password, $user['password'])) {
    die(json_encode(["error" => "Email ou mot de passe incorrect."]));
}

// Redirection selon le site
die(json_encode(["success" => "Connexion réussie.", "site" => $user['site']]));
?>
