// Importations
const express = require('express');

// Importation du controllers/user.js
const postCtrl = require('../controllers/post');

// Importation du middleware d'authentification
const auth = require('../middleware/auth');

// Importation du middleware multer pour la gestion des images
const multer = require('../middleware/multer');


// La fonction Router()
const router = express.Router();

// Les routes
router.get("/",auth , postCtrl.getAllPosts);
router.post("/",auth , postCtrl.createPost);
router.put("/:id",auth , postCtrl.modifyPost);
router.get("/:id",auth , postCtrl.getOnePost);
router.delete("/:id",auth , postCtrl.deletePost);
router.post("/:id/like",auth , postCtrl.notePost);


// Exportation du module
module.exports = router;
