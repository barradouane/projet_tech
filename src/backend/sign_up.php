<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Répondre immédiatement aux requêtes préliminaires OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["nom"], $data["prenom"], $data["email"], $data["mot_de_passe"], $data["confirmer_mot_de_passe"])) {
    http_response_code(400);
    echo json_encode(["error" => "Données incomplètes"]);
    exit();
}

$nom = trim($data["nom"]);
$prenom = trim($data["prenom"]);
$email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
$mot_de_passe = trim($data["mot_de_passe"]);
$confirm_mot_de_passe = trim($data["confirmer_mot_de_passe"]);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Format d'email invalide."]);
    exit();
}

if (!preg_match("/^[a-zA-Z\-]+\.[a-zA-Z\-]+@etu\.eilco\.univ-littoral\.fr$/", $email)) {
    http_response_code(400);
    echo json_encode(["error" => "Email non valide pour un etudiant."]);
    exit();
}

if ($mot_de_passe !== $confirm_mot_de_passe) {
    http_response_code(400);
    echo json_encode(["error" => "Les mots de passe ne correspondent pas."]);
    exit();
}

if (!preg_match("/^(?=.*[A-Z])(?=.*\d).{8,}$/", $mot_de_passe)) {
    http_response_code(400);
    echo json_encode(["error" => "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre."]);
    exit();
}

$stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = :email");
$stmt->execute(['email' => $email]);
if ($stmt->rowCount() > 0) {
    http_response_code(409);
    echo json_encode(["error" => "Cet email est déjà utilisé."]);
    exit();
}

$hashedPassword = password_hash($mot_de_passe, PASSWORD_DEFAULT);

$verification_token = bin2hex(random_bytes(32));

$stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, verification_token, verified) VALUES (:nom, :prenom, :email, :mot_de_passe, 'etudiant', :verification_token, 0)");
$result = $stmt->execute([
    'nom' => $nom,
    'prenom' => $prenom,
    'email' => $email,
    'mot_de_passe' => $hashedPassword,
    'verification_token' => $verification_token
]);

if ($result) {
    $verification_link = "http://localhost/backend/verify_email.php?token=" . urlencode($verification_token);
    $mail = new PHPMailer(true);

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'projet.tech.portail@gmail.com';
        $mail->Password = 'oazw dkfl llsc pztb';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer'       => false,
                'verify_peer_name'  => false,
                'allow_self_signed' => true
            )
        );
    
        $mail->setFrom('no-reply@yourdomain.com', 'Portail Étudiant');
        $mail->addAddress($email, "$prenom $nom");
        $mail->isHTML(true);
        $mail->Subject = "Activation de votre compte - Portail Étudiant";
    
        $mail->Body = "
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              background-color: #ffffff;
              margin: 30px auto;
              padding: 20px;
              max-width: 600px;
              border: 1px solid #dddddd;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .header h2 {
              margin: 0;
              color: #333333;
            }
            .content {
              font-size: 16px;
              color: #555555;
              line-height: 1.5;
            }
            .button {
              display: block;
              width: 200px;
              margin: 30px auto;
              padding: 10px;
              text-align: center;
              background-color: #007BFF;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #999999;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class='container'>
            <div class='header'>
              <h2>Portail Étudiant</h2>
            </div>
            <div class='content'>
              <p>Bonjour {$prenom} {$nom},</p>
              <p>Merci pour votre inscription sur notre Portail Étudiant.</p>
              <p>Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
              <a class='button' href='{$verification_link}'>Activer mon compte</a>
              <p>Si le bouton ne fonctionne pas, copiez et collez l'URL suivante dans votre navigateur :</p>
              <p>{$verification_link}</p>
              
            </div>
            <div class='footer'>
              <p>© " . date("Y") . " Portail Étudiant.</p>
            </div>
          </div>
        </body>
        </html>
        ";
    
        $mail->AltBody = "Bonjour {$prenom} {$nom},\n\nMerci pour votre inscription .\nPour activer votre compte, veuillez copier et coller l'URL suivante dans votre navigateur :\n{$verification_link}\n\n\n\n© " . date("Y") . " Portail Étudiant.";
        
        $mail->send();
        http_response_code(201);
        echo json_encode(["success" => "Utilisateur inscrit avec succès. Vous avez recu un email de verification"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "L'inscription est faite , mais l'envoi de l'e-mail n'a pas abouti. Erreur : " . $mail->ErrorInfo]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de l'inscription."]);
}
?>
