<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permet les requêtes depuis ton localhost
header("Access-Control-Allow-Methods: GET"); // Permet uniquement les requêtes GET
header("Access-Control-Allow-Headers: Content-Type"); // Permet l'en-tête Content-Type

$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'portail_et';

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$host;port=3307;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Sélectionner la base de données
    $pdo->exec("USE $dbname");

    // Requête pour récupérer tous les utilisateurs
    $sql = "SELECT id, nom, prenom, email, site FROM users";
    $stmt = $pdo->query($sql);

    // Vérifier si des utilisateurs ont été trouvés
    if ($stmt->rowCount() > 0) {
        // Récupérer les résultats sous forme de tableau associatif
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Retourner les utilisateurs au format JSON
        echo json_encode($users);
    } else {
        // Si aucun utilisateur n'est trouvé, retourner un tableau vide
        echo json_encode([]);
    }
} catch (PDOException $e) {
    // Gérer les erreurs
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
?>
