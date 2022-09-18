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
const { imageUpload } = require("../middleware/multer");
const { authenticateUser } = require("../middleware/auth");

const postsRouter = express.Router(); // appel express.Router()
const bodyParser = require("body-parser");

postsRouter.use(bodyParser.json());

postsRouter.post("/", authenticateUser, imageUpload, createPost); // création d'un post
postsRouter.put("/:id", authenticateUser, imageUpload, modifyPost); // modification d'un post
postsRouter.delete("/:id", authenticateUser, deletePost); // :id = (deux points) variable
postsRouter.get("/:id", authenticateUser, getOnePost); // :id = (deux points) variable
postsRouter.get("/", authenticateUser, getAllPosts); // affichage posts
postsRouter.post("/:id/like", authenticateUser, likePost); // :id = (deux points) variable + like
postsRouter.post("/:id/comment", authenticateUser, commentPost);
postsRouter.get("/:id/comments", authenticateUser, getAllComments);

module.exports = { postsRouter };
