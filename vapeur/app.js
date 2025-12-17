const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require("body-parser")
const path = require('path');
const hbs = require("hbs");
const app = express();
const port = 8000;
const { seedGenres } = require('./GenreSeeder');

app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(bodyParser.urlencoded())

hbs.registerHelper("formatDate", (date) => {
    return date.toLocaleDateString();
});

(async () => {
  await seedGenres(prisma);
  
  app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
})();

app.get("/", async (req, res) => {
    // on passe seulement le nom du fichier .hbs sans l'extention.
    // Le chemin est relatif au dossier views.
    // On peut aller chercher des templates dans les sous-dossiers (e.g. movies/details).
    console.log("bonjour");
});