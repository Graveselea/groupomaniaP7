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
    }`,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
}

//Modification d'un post
function modifyPost(req, res, next) {
  const postObject = req.file
    ? {
        ...req.body.post,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.status(404).json({
        error: new Error("Post non trouvée !"),
      });
    }
    User.findOne({ email: process.env.ADMIN_EMAIL }).then((user) => {
      const adminUserId = user._id.toString();
      if (post.userId !== req.auth.userId && req.auth.userId !== adminUserId) {
        return res.status(403).json({
          error: new Error("Requête non autorisée !"),
        });
      }
    });
    const fileName = post.imageUrl.split("/images/")[1];
    fs.unlink(`images/${fileName}`, () => {
      Post.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Post modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    });
  });
}

//Suppression d'un post
function deletePost(req, res, next) {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post non trouvée !" });
      }
      User.findOne({ email: process.env.ADMIN_EMAIL }).then((user) => {
        const adminUserId = user._id.toString();
        if (
          post.userId !== req.auth.userId &&
          req.auth.userId !== adminUserId
        ) {
          return res.status(403).json({ message: "Requête non autorisée !" });
        } else {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
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
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
}

//Likes
function likePost(req, res, next) {
  //--Si l'utilisateur ajoute un like
  if (req.body.like === 1) {
    Post.findOne({ _id: req.params.id }).then((post) => {
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

//--Commentaires
function commentPost(req, res, next) {
  //--On retrouve le post dans la base de données
  Post.findOne({ _id: req.params.id }).then((post) => {
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
//-- Avoir tout les commentaires d'un post
function getAllComments(req, res, next) {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post.comments))
    .catch((error) => res.status(400).json({ error }));
}

//-- Exportation des fonctions
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
