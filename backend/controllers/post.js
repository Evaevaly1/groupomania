// Importation d models de la base de donnée MongoDB
const Post = require('../models/Post');

// Importation du module fs de node.js pour accéder aux fichiers du serveur
const fs = require('fs');

exports.createPost = (req, res) => {
    const postObject = (req.body.post);

    const post = new Post({
      ...postObject,
      // imageUrl: `${req.protocol}://${req.get("host")}/images/${
      //   req.file.filename
      // }`, // Url dynamique selon le chemin serveur

    });

    // Enregistrer une nouvelle Post dans la base de données
  post
  .save()
  .then((post) => {
    const message = "Le post a bien été ajouté";
    res.json({ message, data: post });
  })
  .catch((error) => {
    console.log(error);
    const message = "Post non ajouté, réessayez plus tard";
    res.status(500).json({ message, data: error });
  });
};

// Afficher toutes les Posts
exports.getAllPosts = (req, res, next) => {
    var populateQuery = {path:'userId',select:['name','lastname']};
    Post.find({})
        .populate(populateQuery)
        .sort({createdAt: -1})
        .then((post) =>{
            res.status(200).json(post);
        })
        .catch((error) => {
            console.log(error);
            const message = "Les sauces n'ont pu être affichées, réessayez plus tard";
            res.status(404).json({message, data: error});
        });
};

// Afficher un Post selon l'id
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => {
      const message = `Le post ne peut être affiché. Réessayez dans quelques instants.`;
      res.status(404).json({ message, data: error });
    });
};

// modification d'un post (image ou texte)
exports.modifyPost = (req, res, next) => {
  if (req.file) {
    // si modification de l'image=> suppression de l' ancienne image
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          // ajout d'une nouvelle image et update des infos
          const postObject = {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
            Post.updateOne(
                {_id: req.params.id},
                {...postObject, _id: req.params.id}
            )
                .then(() => res.status(200).json({message: "post modifié!"}))
                .catch((error) => res.status(400).json({error}));
        });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    // pas de modification de l' image
    const postObject = (req.body);
    Post.updateOne(
      { _id: req.params.id },
      { ...postObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "post modifié!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// supression d'un post
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    // recherche du nom du fichier image pour le supprimer
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1]; // split de l'URL et récupération du nom de fichier
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then((post) => {
            const message = "Le post a bien été supprimé";
            res.json({ message, data: post });
          })
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => {
      const message = `Le post n'a pas pu être supprimé. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};

// Noter un post (like et dislike)
exports.notePost = (req, res) => {

  if (req.body.like === 0) {
      Post.findOne({ _id: req.params.id })
          .then((post) => {
              // l'utilisateur a déjà "liké" le post
              if (post.usersLiked.find((user) => user === req.body.userId)) {
                  // retrait d'un like et suppression du userId dans le usersLiked
                  Post.updateOne(
                      { _id: req.params.id },
                      { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
                  )
                  .then(() => res.status(200).json({ message: "Note mise à jour" }))
                  .catch((error) => {
                      const message = `Votre note n'a pu être prise en compte, merci de réessayer dans quelques instants.`;
                      res.status(500).json({ message, data: error });
                  });
              }
          })
          .catch((error) => {
              console.log(error);
              const message = `Votre note n'a pas pu être prise en compte, merci de réessayer dans quelques instants.`;
              res.status(500).json({ message, data: error });
          });
  }
  // ajout d'un like et ajout du userId dans le usersLiked
  if (req.body.like === 1) {
      Post.updateOne(
          { _id: req.params.id },
          { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } },
      )
          .then(() => res.status(200).json({ message: "Note prise en compte" }))
          .catch((error) => {
              const message = `Votre note n'a pas pu être prise en compte, merci de réessayer dans quelques instants.`;
              res.status(500).json({ message, data: error });
          });
  }

  // ajout d'un dislike et ajout du userId dans le usersDisliked
  if (req.body.like === -1) {
      Post.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
      )
      .then(() => res.status(200).json({ message: "Note prise en compte" }))
      .catch((error) => {
          const message = `Votre note n'a pas pu être prise en compte, merci de réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
      });
  }

  // l'utilisateur a déjà "disliké" le post
  if (req.body.like === -2) {
      Post.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
      )

          .then(() => res.status(200).json({ message: "Note prise en compte" }))
          .catch((error) => {
              const message = `Votre note n'a pas pu être prise en compte, merci de réessayer dans quelques instants.`;
              res.status(500).json({ message, data: error });
          });
  }
};

  
    
