const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express.Router();

//get/jeux
app.get('/', listeJeux);

// Affiche la liste des jeux
async function listeJeux(req, res) {
    try {
        const jeux = await prisma.jeu.findMany({
            orderBy: { Jeu_nom: 'asc' }
        });
        res.render("jeux/index", {
            titre : "Liste des jeux",
            jeux: jeux,
        });
    }
    catch (error) {
        console.error("Erreur lors de la récupération des jeux:", error);
        res.status(500).send("Erreur serveur.");
    } 
}

// modifier un jeu - get
app.get('/modifier/:id', async (req, res) => {
    const jeuId = parseInt(req.params.id);
    try {
        const jeu = await prisma.jeu.findUnique({
            where: { Jeu_id: jeuId }
        });
        if (!jeu) {
            return res.status(404).send("Jeu non trouvé.");
        }
        res.render("jeux/form", {
            titre: "Modifier un jeu",
            jeu: jeu
        });
    } catch (error) {
        console.error("Erreur lors de la récupération du jeu:", error);
        res.status(500).send("Erreur serveur.");
    }
});

//ajouter un jeu - post
app.post('/modifier/:id', async (req, res) => {
    const jeuId = parseInt(req.params.id);
    const { Jeu_nom, Jeu_description, Jeu_date_sortie } = req.body;
    try {
        await prisma.jeu.update({
            where: { Jeu_id: jeuId },
            data: {
                Jeu_nom,
                Jeu_description,
                Jeu_date_sortie
            }
        });
        res.redirect("/jeux");
    } catch (error) {
        console.error("Erreur lors de la modification du jeu:", error);
        res.status(500).send("Erreur serveur.");
    }
});















module.exports = app;



