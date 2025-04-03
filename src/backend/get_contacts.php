<?php
session_start();

include 'db.php';

if (!isset($_SESSION['site'])) {
    echo json_encode([
        "success" => false,
        "message" => "Aucun site sélectionné dans la session."
    ]);
    exit;
}

$site = $_SESSION['site'];

try {
    $stmt = $pdo->prepare("SELECT * FROM contacts WHERE site = :site");
    $stmt->execute(['site' => $site]);
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "contacts" => $contacts
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => 'Erreur : ' . $e->getMessage()
    ]);
}
?>