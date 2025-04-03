<?php
include 'db.php';

try {
    $query = "SELECT * FROM contacts";
    $params = [];

    // Vérifier si un filtre est appliqué
    if (isset($_GET['service'])) {
        $query .= " WHERE service = :service";
        $params[':service'] = $_GET['service'];
    } elseif (isset($_GET['niveau'])) {
        $query .= " WHERE niveau = :niveau";
        $params[':niveau'] = $_GET['niveau'];
    }

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "contacts" => $contacts
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => 'Erreur : ' . $e->getMessage()
    ]);
}
?>
