Inscription
Un utilisateur s'inscrit avec son nom, prénom, e-mail (format étudiant) et mot de passe.
Le mot de passe doit respecter une certaine complexité (minimum 8 caractères, avec au moins une majuscule et un chiffre).
Après inscription, un e-mail de vérification est envoyé à l'adresse fournie.
Le compte reste inactif jusqu'à la vérification via le lien contenu dans l'e-mail.

Vérification
Le lien contenu dans l'e-mail dirige l'utilisateur vers une API de vérification qui active son compte.

Connexion
Les utilisateurs peuvent se connecter avec leur e-mail et mot de passe.
Le système vérifie que le compte a bien été activé et, en cas de connexion réussie, un e-mail informatif de connexion est envoyé et un token CSRF est généré pour sécuriser les interactions futures.
