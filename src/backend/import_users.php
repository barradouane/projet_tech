<?php
// Inclusion de l'autoloader généré par Composer
require __DIR__ . '/vendor/autoload.php';

require 'db.php';
require 'Admin_add_user.php'; // Contient la classe AdminUserManager

use PhpOffice\PhpSpreadsheet\IOFactory;

// Création d'une instance de AdminUserManager
$adminManager = new AdminUserManager($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['excelFile']) && $_FILES['excelFile']['error'] === UPLOAD_ERR_OK) {
        $filePath = $_FILES['excelFile']['tmp_name'];

        try {
            // Chargement du fichier Excel
            $spreadsheet = IOFactory::load($filePath);
            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray();

            $errors = [];
            $successCount = 0;

            // Supposons que la première ligne contient les en-têtes
            foreach ($rows as $index => $row) {
                if ($index === 0) continue; // Ignorer l'en-tête

                $nom      = isset($row[0]) ? trim($row[0]) : null;
                $prenom   = isset($row[1]) ? trim($row[1]) : null;
                $email    = isset($row[2]) ? trim($row[2]) : null;
                $password = isset($row[3]) ? trim($row[3]) : null;
                $site     = isset($row[4]) ? trim($row[4]) : null;

                if ($nom && $prenom && $email && $password && $site) {
                    $result = $adminManager->addUser($nom, $prenom, $email, $password, $site);
                    if ($result) {
                        $successCount++;
                    } else {
                        $errors[] = "Erreur lors de l'ajout de l'utilisateur avec l'email : $email";
                    }
                } else {
                    $errors[] = "Ligne " . ($index + 1) . " : informations manquantes.";
                }
            }

            if (empty($errors)) {
                echo json_encode(["success" => "$successCount utilisateur(s) ajouté(s) avec succès."]);
            } else {
                echo json_encode([
                    "success" => "$successCount utilisateur(s) ajouté(s) avec succès.",
                    "errors"  => $errors
                ]);
            }
        } catch (Exception $e) {
            echo json_encode(["error" => "Erreur lors du traitement du fichier Excel : " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Aucun fichier Excel n'a été reçu."]);
    }
}
?>
