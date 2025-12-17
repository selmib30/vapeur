const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express.Router();

//get/jeux
app.get('/', listeJeux);

// Affiche la liste des jeux
async function listeJeux(req, res) {
    try {
        const jeuxRaw = await prisma.jeu.findMany({
            include: { genre: true, editeur: true },
            orderBy: { Jeu_nom: 'asc' }
        });

        // Map to the shape expected by the template (nom, description, Genre.nom, Editeur.nom, Jeu_id)
        const jeux = jeuxRaw.map(j => ({
            Jeu_id: j.Jeu_id,
            nom: j.Jeu_nom,
            description: j.description,
            Genre: j.genre ? { nom: j.genre.Genre_nom } : { nom: '' },
            Editeur: j.editeur ? { nom: j.editeur.Editeur_nom } : { nom: '' }
        }));

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

        // get genres and editeurs for selects
        const genresRaw = await prisma.genre.findMany({ orderBy: { Genre_nom: 'asc' } });
        const editeursRaw = await prisma.editeur.findMany({ orderBy: { Editeur_nom: 'asc' } });

        const genres = genresRaw.map(g => ({ id: g.Genre_id, nom: g.Genre_nom, selected: g.Genre_id === jeu.genreId }));
        const editeurs = editeursRaw.map(e => ({ id: e.Editeur_id, nom: e.Editeur_nom, selected: e.Editeur_id === jeu.editeurId }));

        // map jeu to template-friendly fields
        const jeuForTemplate = {
            Jeu_id: jeu.Jeu_id,
            nom: jeu.Jeu_nom,
            description: jeu.description,
            date: jeu.date_sortie ? jeu.date_sortie.toISOString().slice(0,10) : '',
            genreId: jeu.genreId,
            editeurId: jeu.editeurId,
            misEnAvant: jeu.mis_en_avant
        };

        res.render("jeux/form", {
            titre : "Modifier un jeu",
            jeu: jeuForTemplate,
            genres,
            editeurs
        });
    } catch (error) {
        console.error("Erreur lors de la récupération du jeu:", error);
        res.status(500).send("Erreur serveur.");
    }
});

// supprimer un jeu - post
app.post('/supprimer/:id', async (req, res) => {
    const jeuId = parseInt(req.params.id);
    try {
        await prisma.jeu.delete({
            where: { Jeu_id: jeuId }
        });
        res.redirect('/jeux');
    } catch (error) {
        console.error("Erreur lors de la suppression du jeu:", error);
        res.status(500).send("Erreur serveur.");
    }
});

// afficher le formulaire d'ajout d'un jeu - get
app.get('/form', async (req, res) => {
    try {
        const genresRaw = await prisma.genre.findMany({ orderBy: { Genre_nom: 'asc' } });
        const editeursRaw = await prisma.editeur.findMany({ orderBy: { Editeur_nom: 'asc' } });

        // map to simple objects for the template
        const genres = genresRaw.map(g => ({ id: g.Genre_id, nom: g.Genre_nom }));
        const editeurs = editeursRaw.map(e => ({ id: e.Editeur_id, nom: e.Editeur_nom }));

        res.render('jeux/form', {
            titre: 'Ajouter un jeu',
            genres,
            editeurs
        });
    } catch (error) {
        console.error('Erreur affichage formulaire :', error);
        res.status(500).send('Erreur serveur.');
    }
});

// modifier un jeu - post
app.post('/modifier/:id', async (req, res) => {
    const jeuId = parseInt(req.params.id);
    try {
        const { nom, description, date, genreId, editeurId, misEnAvant } = req.body;

        await prisma.jeu.update({
            where: { Jeu_id: jeuId },
            data: {
                Jeu_nom: nom,
                description: description || '',
                date_sortie: date ? new Date(date) : null,
                mis_en_avant: misEnAvant ? true : false,
                genreId: genreId ? parseInt(genreId) : undefined,
                editeurId: editeurId ? parseInt(editeurId) : undefined
            }
        });
        res.redirect("/jeux");
    } catch (error) {
        console.error("Erreur lors de la modification du jeu:", error);
        res.status(500).send("Erreur serveur.");
    }
});
// créer un jeu - post
app.post('/form', async (req, res) => {
    try {
        const { nom, description, date, genreId, editeurId, misEnAvant } = req.body;

        await prisma.jeu.create({
            data: {
                Jeu_nom: nom,
                description: description || '',
                date_sortie: date ? new Date(date) : null,
                mis_en_avant: misEnAvant ? true : false,
                genreId: genreId ? parseInt(genreId) : undefined,
                editeurId: editeurId ? parseInt(editeurId) : undefined
            }
        });
        res.redirect('/jeux');
    } catch (error) {
        console.error('Erreur lors de la création du jeu :', error);
        res.status(500).send('Erreur serveur.');
    }
});
















module.exports = app;



