const { send } = require("process");
const fs = require("fs"); // Supprime de manière asynchrone un fichier avec une promesse
const path = require("path");
const User = require("../models/userModel");
const Post = require("../models/postModel");
require("dotenv").config();

//Création d'un post
function createPost(req, res, next) {
  const postObject = req.body.post;
  const post = new Post({
    userId: req.auth.userId,
    post: postObject,
    name: req.body.name,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file?.filename
    }`, //--Reconstruction de l'Url de l'image
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
}

//Modification d'un post
function modifyPost(req, res, next) {
  //--Test > Nouvelle image ou non
  const postObject = req.file //--req.file ? est un opérateur ternaire pour savoir si un fichier existe
    ? {
        ...req.body.post,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, //--Reconstruction de l'Url de l'image
      }
    : { ...req.body };
  //--Récupération du post dans la base et vérification qu'il appartient bien à la personne qui effectue la requête delete
  //--et autorisation à l'administrateur
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.status(404).json({
        error: new Error("Post non trouvée !"),
      });
    }
    User.findOne({ email: process.env.adminEmail }).then((user) => {
      if (post.userId !== req.auth.userId) {
        return res.status(403).json({
          error: new Error("Requête non autorisée !"),
        });
      }
    });
    //--Suppression de lancienne image dans le système de fichier
    const fileName = post.imageUrl.split("/images/")[1]; //--Nom de l'ancienne post
    fs.unlink(`images/${fileName}`, () => {
      //--Mise à jour de la post
      Post.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
      ) //--Cette ligne permet de comparer les id afin d'être certain de mettre à jour le bon post
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    });
  });
}

//Suppression d'un post
function deletePost(req, res, next) {
  //--Vérification du propriétaire du post et autotisation à l'administrateur
  Post.findOne({ _id: req.params.id }) //--On trouve l'objet dans la base de données
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post non trouvée !" });
      }
      User.findOne({ email: process.env.adminEmail }).then((user) => {
        if (post.userId !== req.auth.userId) {
          return res.status(403).json({ message: "Requête non autorisée !" });
        } else {
          const filename = post.imageUrl.split("/images/")[1]; //--Ici, split renvoit un tableau composé de deux éléments. 1- Ce qu'il y avant /images/ et un deuxième élément avec ce qu'il y après /images/
          fs.unlink(`images/${filename}`, () => {
            //--unlink est une fonction de fs (file système qui permet de supprimer un fichier``)
            Post.deleteOne({ _id: req.params.id }) //--Ici, pas besoin de 2eme argument car c'est une suppression
              .then(() => res.status(200).json({ message: "Post supprimé !" }))
              .catch((error) => res.status(400).json({ error }));
          });
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
}

//Récupération d'un post
function getOnePost(req, res, next) {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
}

//Récupération de tous les posts
function getAllPosts(req, res, next) {
  Post.find()
    .sort({ createdAt: -1 }) //--On récupère tous les posts et on les trie par date de création
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
}

//Likes
function likePost(req, res, next) {
  //--Si l'utilisateur ajoute un like
  if (req.body.like === 1) {
    Post.findOne({ _id: req.params.id }).then((post) => {
      //--On regarde s'il est déjà dans le tableau "usersLiked"
      //--S'il n'y est pas, on incrémente "Like" et on l'ajoute au tableau "usersLiked"
      if (!post.usersLiked.includes(req.body.userId)) {
        if (!post.usersLiked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "Like Ok !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      }
    });
  }

  //--Si l'utilisateur supprime son "like"
  if (req.body.like === 0) {
    Post.findOne({ _id: req.params.id }).then((post) => {
      //--S'il est dans le tableau "usersLiked", on décrémente "Like" et on le supprime du tableau "usersLiked"
      if (post.usersLiked.includes(req.body.userId)) {
        Post.updateOne(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(200).json({ message: "Delete like Ok !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    });
  }
}

function commentPost(req, res, next) {
  //--On retrouve le post dans la base de données
  Post.findById().then((post) => {
    //-- On envoit le commentaire dans le post
    const comment = {
      userId: req.auth.userId,
      comment: req.body.comment,
      name: req.body.name,
    };
    Post.updateOne(
      { _id: req.params.id },
      {
        $addToSet: {
          comments: comment,
        },
      }
    )
      .then(() => res.status(200).json({ message: "Commentaire ajouté!" }))
      .catch((error) => res.status(400).json({ error }));
  });
}

function getAllComments(req, res, next) {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post.comments))
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  createPost,
  modifyPost,
  deletePost,
  getOnePost,
  getAllPosts,
  likePost,
  commentPost,
  getAllComments,
};
