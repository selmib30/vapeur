const express = require('express');
const router = express.Router();
const editeursController = require('../controllers/editeurs'); 

// GET /editeurs/creation - Affiche le formulaire
router.get('/creation', editeursController.getCreateEditeur); 

// POST /editeurs/creation - Traite la création
router.post('/creation', editeursController.postCreateEditeur); 

// GET /editeurs - Liste tous les éditeurs
router.get('/', editeursController.listeEditeurs); 


// GET /editeurs/:id/modification - Affiche le formulaire
router.get('/:id/modification', editeursController.getEditEditeur); 

// POST /editeurs/:id/modification - Traite la modification
router.post('/:id/modification', editeursController.postEditEditeur); 

// POST /editeurs/:id/suppression - Traite la suppression
router.post('/:id/suppression', editeursController.postDeleteEditeur); 

// GET /editeurs/:id - Affiche les jeux de l'éditeur (Détail)
router.get('/:id', editeursController.getEditeurById);

module.exports = router;