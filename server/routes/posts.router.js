const express = require("express"); //appel express

// Controllers
const {
  getAllPosts,
  createPost,
  getOnePost,
  deletePost,
  modifyPost,
  likePost,
  commentPost,
  getAllComments,
} = require("../controllers/posts");

// Middleware
const multer = require("../middleware/multer");
const { authenticateUser } = require("../middleware/auth");

const postsRouter = express.Router(); // appel express.Router()
const bodyParser = require("body-parser");

postsRouter.use(bodyParser.json());

postsRouter.post("/", authenticateUser, multer, createPost); // création d'un post
postsRouter.put("/:id", authenticateUser, multer, modifyPost); // modification d'un post
postsRouter.delete("/:id", authenticateUser, multer, deletePost); // :id = (deux points) variable + suppression d'un post
postsRouter.get("/:id", authenticateUser, getOnePost); // :id = (deux points) variable + récupération d'un post
postsRouter.get("/", authenticateUser, getAllPosts); // affichage posts
postsRouter.post("/:id/like", authenticateUser, likePost); // :id = (deux points) variable + like
postsRouter.post("/:id/comment", authenticateUser, commentPost); // :id = (deux points) variable + commentaire
postsRouter.get("/:id/comments", authenticateUser, getAllComments); // :id = (deux points) variable + commentaires

module.exports = { postsRouter };
