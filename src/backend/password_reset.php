<?php

session_start();

// CORS — répond à l’OPTIONS ET à la requête POST
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__.'/db.php';
require_once __DIR__.'/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;



$data = json_decode(file_get_contents("php://input"), true);

// 1️⃣ Demande de lien de réinitialisation
if (isset($data['email'])) {
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', time() + 3600);

    $stmt = $pdo->prepare("
        UPDATE utilisateurs 
        SET reset_token = :token, reset_token_expires = :expires 
        WHERE email = :email
    ");
    $stmt->execute([
        ':token'   => $token,
        ':expires' => $expires,
        ':email'   => $data['email']
    ]);

    if ($stmt->rowCount()) {
        $link = "http://localhost/projet_tech-elmehdi/projet_tech-elmehdi/src/backend/password_reset.php?token=$token";

        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'projet.tech.portail@gmail.com';
        $mail->Password   = 'oazw dkfl llsc pztb';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->setFrom('no-reply@portail.com','Portail Étudiant');
        $mail->addAddress($data['email']);
        $mail->Subject = 'Réinitialisation mot de passe';
        $mail->Body    = "Clique ici pour réinitialiser votre mot de passe : <a href='$link'>$link</a>";
        $mail->send();

        echo json_encode(['success' => 'Email envoyé']);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Email inconnu']);
    }
    exit;
}

// 2️⃣ Réinitialisation du mot de passe
if (isset($data['token'], $data['new_password'])) {
    $stmt = $pdo->prepare("
        SELECT id FROM utilisateurs 
        WHERE reset_token = :token 
          AND reset_token_expires > NOW()
    ");
    $stmt->execute([':token' => $data['token']]);

    if (!$user = $stmt->fetch(PDO::FETCH_ASSOC)) {
        http_response_code(400);
        exit(json_encode(['error' => 'Token invalide ou expiré']));
    }

    $hash = password_hash($data['new_password'], PASSWORD_DEFAULT);
    $update = $pdo->prepare("
        UPDATE utilisateurs 
        SET mot_de_passe = :hash, reset_token = NULL, reset_token_expires = NULL 
        WHERE id = :id
    ");
    $update->execute([
        ':hash' => $hash,
        ':id'   => $user['id']
    ]);

    echo json_encode(['success' => 'Mot de passe mis à jour']);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Requête invalide']);
?>
