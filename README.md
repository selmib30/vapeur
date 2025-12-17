# vapeur
Projet vapeur MSCA
Ce projet permet de gerer une liste de jeux, ajouter, supprimer, modifier, leurs mettre des éditeurs, des genres. il permets de trier les jeux par genre et ou par editeur.

cloner le depot git
cloner le dossier sur son ordinateur

Environnent à configurée pour lancer le projet:
1) npm Install prisma@6.19.0
2) npm install sqlite3
3) npm install express
4) rajouter un .env dans /vaper 
5) rajouter la base de donnée : DATABASE_URL="file:./database.db"
6) npx prisma migrate deploy
7) npx prisma generate
8) npm run start

Répartition des taches : 
1. Index principal :Clément
2. mise en place du serveur /initialisation du serveur : Selim
3. BDD/architecture du projet : selim, Matthieu
4. Gestions Editeurs / Jeux / genre : selim, Matthieu, Alizée
5. design css : selim / clément
6. squelette du projet layout : clément



