<?php
include 'db.php';
try {
    $stmt = $pdo->query("SELECT * FROM contacts");
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "contacts" => $contacts
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => 'Erreur : ' . $e->getMessage()
    ]);};
?>