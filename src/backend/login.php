<?php
session_start();
// En-têtes CORS et Content-Type
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Log les erreurs dans un fichier
 *
 * @param string $message Message d'erreur à enregistrer
 */
function log_error($message) {
    $logfile = 'errors.log';
    $timestamp = date("Y-m-d H:i:s");
    file_put_contents($logfile, "[$timestamp] $message\n", FILE_APPEND);
}

require_once "db.php"; 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portail_etudiant"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    log_error("Erreur de connexion à la base de données : " . $conn->connect_error);
    http_response_code(500);
    echo json_encode(["error" => "Échec de la connexion à la base de données."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["email"], $data["mot_de_passe"])) {
    log_error("Données de connexion incomplètes");
    http_response_code(400);
    echo json_encode(["error" => "Données incomplètes"]);
    exit();
}

$email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
$mot_de_passe = trim($data["mot_de_passe"]);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    log_error("Email invalide : $email");
    http_response_code(400);
    echo json_encode(["error" => "Email invalide"]);
    exit();
}

if (
  !preg_match("/^[a-z]+\.[a-z]+@etu\.eilco\.univ-littoral\.fr$/", $email)
  && !preg_match("/^admin@etu\.eilco\.univ-littoral\.fr$/", $email)
) {
  http_response_code(400);
  echo json_encode(["error" => "Email non valide."]);
  exit();
}


$stmt = $conn->prepare("SELECT id, mot_de_passe, role, verified, nom, prenom FROM utilisateurs WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    log_error("Utilisateur non trouvé pour l'email : $email");
    http_response_code(404);
    echo json_encode(["error" => "Utilisateur non trouvé."]);
    $stmt->close();
    exit();
}

$stmt->bind_result($id, $hashedPassword, $role, $verified, $nom, $prenom);
$stmt->fetch();

if ($verified == 0) {
    log_error("Compte non vérifié pour l'email : $email");
    http_response_code(403);
    echo json_encode(["error" => "Votre compte n'est pas vérifié."]);
    $stmt->close();
    exit();
}


if (!password_verify($mot_de_passe, $hashedPassword)) {
    log_error("Mot de passe incorrect pour l'email : $email");
    http_response_code(401);
    echo json_encode(["error" => "Mot de passe incorrect."]);
    $stmt->close();
    exit();
}

$updateStmt = $conn->prepare("UPDATE utilisateurs SET session_active = 1 WHERE id = ?");
$updateStmt->bind_param("i", $id);
$updateStmt->execute();
$updateStmt->close();

session_regenerate_id(true);
$_SESSION['user_id'] = $id;
$_SESSION['role'] = $role;
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

require_once __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'projet.tech.portail@gmail.com';
    $mail->Password   = 'oazw dkfl llsc pztb';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
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
    $mail->Subject = "Connexion réussie sur Portail Étudiant";
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
          <p>Hello{$prenom} {$nom},</p>
          <p> You are logged to your student Portal at " . date("Y-m-d H:i:s") . ".</p>
          <
        </div>
        
      
    </body>
    </html>
    ";
    $mail->AltBody = "Hello  {$prenom} {$nom},\n\nYou are logged to your student Portal at " . date("Y-m-d H:i:s") . ".\n" . date(format: "Y") . " Student Portal .";
    $mail->send();
} catch (Exception $e) {
    // Gérer l'erreur si nécessaire
}

http_response_code(200);
echo json_encode([
    "success"    => "Connexion réussie.",
    "id"         => $id,
    "role"       => $role,
    "csrf_token" => $_SESSION['csrf_token']
]);

$stmt->close();
$conn->close();
?>
