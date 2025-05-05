<?php
// Prevent PHP warnings from breaking JSON output
ini_set('display_errors', 0);
error_reporting(E_ERROR);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';
// Include PHPMailer - adjust the path if needed
require_once 'vendor/autoload.php'; // Or your specific path to PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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

// Générer un token de vérification
$verificationToken = bin2hex(random_bytes(32));

// Insérer l'utilisateur avec le token de vérification
$stmt = $pdo->prepare("INSERT INTO users (nom, prenom, email, password, site, email_verified, verification_token) VALUES (?, ?, ?, ?, ?, 0, ?)");

if ($stmt->execute([$nom, $prenom, $email, $hashedPassword, $site, $verificationToken])) {
    // Créer le lien de vérification
    $verificationLink = "http://localhost/projet_tech-WorkingVersion/src/backend/verify-email.php?token=" . $verificationToken;
    
    // Essayer d'envoyer l'email avec PHPMailer
    $emailSent = false;
    
    try {
        $mail = new PHPMailer(true);
        
        // Configuration du serveur
        $mail->isSMTP();
        
        $mail->CharSet    = 'UTF-8'; 
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'projet.tech.portail@gmail.com';
        $mail->Password   = 'oazw dkfl llsc pztb';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->setFrom('no-reply@portail.com','Portail Étudiant');
        
        // Destinataires
        
        $mail->addAddress($email, $prenom . ' ' . $nom);
        
        // Contenu
        $mail->isHTML(true);
        $mail->Subject = "Vérification de votre compte";
        $mail->Body = "
    <html>
    <head>
        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #e4e4e4;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 2px solid #eaeaea;
            }
            .content {
                padding: 20px;
                background-color: #ffffff;
                border-radius: 4px;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #4a86e8;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                margin: 20px 0;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #888888;
            }
            .warning {
                font-size: 12px;
                color: #777;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>
                <h2>Vérification de votre compte</h2>
            </div>
            <div class='content'>
                <p>Bonjour $prenom $nom,</p>
                <p>Merci pour votre inscription, nous sommes ravis de vous accueillir sur le Portail Étudiant. Pour activer votre compte et accéder à toutes les fonctionnalités, veuillez vérifier votre adresse email.</p>
                <p>Cliquez sur le bouton ci-dessous pour confirmer votre adresse email :</p>
                
                <div style='text-align: center;'>
                    <a href='$verificationLink' class='button'>Vérifier mon adresse email</a>
                </div>
                
                <p>Si vous n'avez pas créé de compte sur notre plateforme, vous pouvez ignorer cet email.</p>
                
                <p class='warning'>Ce lien de vérification est valable pendant 24 heures pour des raisons de sécurité.</p>
            </div>
            <div class='footer'>
                <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
                <p>&copy; " . date('Y') . " Portail Étudiant - Tous droits réservés</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $mail->AltBody = "Bonjour $prenom $nom,\n\nMerci pour votre inscription, nous sommes ravis de vous accueillir sur le Portail Étudiant. Pour activer votre compte et accéder à toutes les fonctionnalités, veuillez vérifier votre adresse email.\n\nPour confirmer votre adresse email, veuillez cliquer sur le lien suivant ou le copier dans votre navigateur :\n\n$verificationLink\n\nSi vous n'avez pas créé de compte sur notre plateforme, vous pouvez ignorer cet email.\n\nCe lien de vérification est valable pendant 24 heures pour des raisons de sécurité.\n\nPortail Étudiant";
    
        $mail->AltBody = "Bonjour $prenom $nom,Merci pour votre inscription, nous sommes ravis de vous accueillir sur le Portail Étudiant. Veuillez cliquer sur ce lien pour vérifier votre adresse email : $verificationLink";
        
        $mail->send();
        $emailSent = true;
    } catch (Exception $e) {
        // Enregistrer l'erreur dans un fichier de log
        error_log("Erreur d'envoi d'email: {$mail->ErrorInfo}", 3, "email_errors.log");
    }
    
    if ($emailSent) {
        echo json_encode(["success" => "Inscription réussie ! Veuillez vérifier votre email pour activer votre compte."]);
    } else {
        echo json_encode(["success" => "Inscription réussie ! Votre compte a été créé, mais l'envoi de l'email de vérification a échoué. Contactez l'administrateur."]);
    }
    exit;
} else {
    error_log("Erreur SQL : " . print_r($stmt->errorInfo(), true));
    echo json_encode(["error" => "Erreur lors de l'inscription."]);
    exit;
}
?>