<?php
include 'db.php'; // This will use your OVH database connection

header("Access-Control-Allow-Origin: *"); // Permettre toutes les origines pendant le développement
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); 



try {
    // Requête pour récupérer tous les utilisateurs
    $sql = "SELECT id, nom, prenom, email, site, email_verified FROM users";
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
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
?>