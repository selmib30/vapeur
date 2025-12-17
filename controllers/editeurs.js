const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express.Router();

// GET /editeurs/creation - Affiche le formulaire
app.get('/creation', getCreateEditeur); 

// POST /editeurs/creation - Traite la création
app.post('/creation', postCreateEditeur); 

// GET /editeurs - Liste tous les éditeurs
app.get('/', listeEditeurs); 

// GET /editeurs/:id/modification - Affiche le formulaire
app.get('/:id/modification', getEditEditeur); 

// POST /editeurs/:id/modification - Traite la modification
app.post('/:id/modification', postEditEditeur); 

// POST /editeurs/:id/suppression - Traite la suppression
app.post('/:id/suppression', postDeleteEditeur); 

// GET /editeurs/:id - Affiche les jeux de l'éditeur (Détail)
app.get('/:id', getEditeurById);




// GET /editeurs - Affiche la liste des éditeurs
async function listeEditeurs(req, res) { 
    try {
        const editeurs = await prisma.editeur.findMany({
            orderBy: { Editeur_nom: 'asc' }
        });
        res.render("editeurs/liste", {
            editeurs: editeurs,
        });
    }
    catch (error) {
        console.error("Erreur lors de la récupération des éditeurs:", error);
        res.status(500).send("Erreur serveur.");
    }
}


//GET /editeurs/:id - Affiche les jeux d'un éditeur spécifique
async function getEditeurById(req, res) {
    const editeurId = parseInt(req.params.id); 
    try {
        const editeur = await prisma.editeur.findUnique({
            where: { Editeur_id: editeurId }, 
            include: { jeux: true } 
        });

        if (!editeur) {
            return res.status(404).send("Éditeur non trouvé.");
        }
        
        res.render("editeurs/jeux", {
            editeur: editeur,
            jeux: editeur.jeux,
        });
    }
    catch (error) {
        console.error("Erreur lors de l'affichage des jeux de l'éditeur:", error);
        res.status(500).send("Erreur serveur.");
    }
}

// GET /editeurs/creation - Affiche le formulaire de création

async function getCreateEditeur(req, res) { 
    res.render("editeurs/formulaire", { 
        titre: "Creation d'un nouvel éditeur.",
        action: "/editeurs/creation", 
        editeur: { Editeur_nom: '' } 
    });
}

//POST /editeurs/creation - Traite la création de l'éditeur
async function postCreateEditeur(req, res) { 
    console.log("Corps de la requête:", req.body); 
    const { nom } = req.body;
    try {
        await prisma.editeur.create({
            data: { Editeur_nom: nom } 
        });
        res.redirect("/editeurs");
    } catch (error) {
        console.error("Erreur lors de la création de l'éditeur:", error);
        
        res.render("editeurs/formulaire", {
            action: "/editeurs/creation",
            editeur: { Editeur_nom: nom }, 
        });
    }
}


//GET /editeurs/:id/modification - Affiche le formulaire de modification
async function getEditEditeur(req, res) {
    const editeurId = parseInt(req.params.id);
    try {
        const editeur = await prisma.editeur.findUnique({
            where: { Editeur_id: editeurId }, 
        });

        if (!editeur) {
            return res.status(404).send("Éditeur non trouvé.");
        }
        
        res.render("editeurs/formulaire", {
            editeur: editeur,
            titre: `Modifier l'éditeur ${editeur.Editeur_nom}`, 
            action: `/editeurs/${editeur.Editeur_id}/modification`
        });
    }
    catch (error) {
        console.error("Erreur lors de l'affichage du formulaire de modification de l'éditeur:", error);
        res.status(500).send("Erreur serveur.");
    }
}

//POST /editeurs/:id/modification - Traite la modification de l'éditeur
async function postEditEditeur(req, res) { 
    const editeurId = parseInt(req.params.id);
    const { nom } = req.body;
    try {
        await prisma.editeur.update({
            where: { Editeur_id: editeurId }, 
            data: { Editeur_nom: nom } 
        });
        res.redirect("/editeurs");
    } catch (error) {
        console.error("Erreur lors de la modification de l'éditeur:", error);
                
        res.render("editeurs/formulaire", {
            editeur: { Editeur_id: editeurId, Editeur_nom: nom }, 
            titre: `Modifier l'éditeur ${editeur.Editeur_nom}`,
            action: `/editeurs/${editeurId}/modification`,
        });
    }
}

//POST /editeurs/:id/suppression - Traite la suppression de l'éditeur
async function postDeleteEditeur(req, res) { 
    const editeurId = parseInt(req.params.id);
    
    
    try {
        await prisma.editeur.delete({
            where: { Editeur_id: editeurId } 
        });
        res.redirect("/editeurs");
    }
    catch (error) {
        console.error("Erreur lors de la suppression de l'éditeur:", error);
        let messageErreur = "Erreur lors de la suppression. Il est probable que cet éditeur soit encore lié à un ou plusieurs jeux.";
        res.redirect(`/editeurs?erreur=${encodeURIComponent(messageErreur)}`);
    }
}

module.exports = app;