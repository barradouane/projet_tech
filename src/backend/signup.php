<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';



$data = json_decode(file_get_contents("php://input"));

if (!isset($data->nom, $data->prenom, $data->email, $data->password, $data->confirmPassword, $data->site)) {
    echo json_encode(["error" => "Tous les champs sont requis."]);
    exit;
}

$nom = htmlspecialchars($data->nom);
$prenom = htmlspecialchars($data->prenom);
$email = strtolower(trim($data->email));
$password = $data->password;
$confirmPassword = $data->confirmPassword;
$site = htmlspecialchars($data->site);

// Vérification du format email
if (!preg_match('/^[a-z]+\.[a-z]+@etu\.eilco\.univ-littoral\.fr$/', $email)) {
    echo json_encode(["error" => "L'email doit être sous le format prenom.nom@etu.eilco.univ-littoral.fr."]);
    exit;
}

// Vérification du mot de passe (min 6 caractères, 1 majuscule, 1 chiffre)
if (strlen($password) < 6 || !preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password)) {
    echo json_encode(["error" => "Le mot de passe doit contenir au moins 6 caractères, une majuscule et un chiffre."]);
    exit;
}

// Vérification confirmation du mot de passe
if ($password !== $confirmPassword) {
    echo json_encode(["error" => "Les mots de passe ne correspondent pas."]);
    exit;
}

// Vérifier si l'email est déjà utilisé
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["error" => "Cet email est déjà utilisé."]);
    exit;
}

// Hash du mot de passe
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insérer l'utilisateur
$stmt = $pdo->prepare("INSERT INTO users (nom, prenom, email, password, site) VALUES (?, ?, ?, ?, ?)");

if ($stmt->execute([$nom, $prenom, $email, $hashedPassword, $site])) {
    echo json_encode(["success" => "Inscription réussie !"]);
    exit;
} else {
    error_log("Erreur SQL : " . print_r($stmt->errorInfo(), true)); // 🔥 Log de l'erreur SQL
    echo json_encode(["error" => "Erreur lors de l'inscription."]);
    exit;
}
?>
