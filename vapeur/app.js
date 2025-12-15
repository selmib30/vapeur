// Fichier : app.js (Version mise à jour)

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require("body-parser") 
const path = require('path');
const hbs = require("hbs");

const app = express();
const port = 8000;

const editeursRouter = require('./routes/editeurs');

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

hbs.registerHelper("formatDate", (date) => {
    if (date instanceof Date && !isNaN(date)) {
        return date.toLocaleDateString();
    }
    return '';
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});


app.get('/', (req, res) => {
    //pour le moment editeurs est la page d'accueil
    res.redirect('/editeurs');
});


app.use('/editeurs', editeursRouter); 

app.use((req, res) => {
    res.status(404).render("404", { titre: "Page Non Trouvée" }); 
});

app.use((err, req, res, next) => {
    console.error('--- ERREUR SERVEUR (500) ---');
    console.error(err.stack); 
    
    res.status(500).render("500", { 
        titre: "Erreur Serveur",
        error: err 
    });
});