const express = require("express") //appel express

// Controllers
const {
  getAllPosts,
  createPost,
  getOnePost,
  deletePost,
  modifyPost,
  likePost,
  createComment,
  getAllComments,
  deleteComment,
} = require("../controllers/posts")

// Middleware
const multer = require("../middleware/multer")
const { authenticateUser } = require("../middleware/auth")

const postsRouter = express.Router(); // appel express.Router()
const bodyParser = require('body-parser');

postsRouter.use(bodyParser.json())

postsRouter.post("/", authenticateUser, multer, createPost) // création d'un post
postsRouter.put("/:id", authenticateUser, multer, modifyPost) // modification d'un post
postsRouter.delete("/:id", authenticateUser, deletePost) // :id = (deux points) variable
postsRouter.get("/:id", authenticateUser, getOnePost) // :id = (deux points) variable
postsRouter.get("/", authenticateUser, getAllPosts)
postsRouter.post("/:id/like", authenticateUser, likePost)
postsRouter.get("/", authenticateUser, getAllComments)
postsRouter.delete("/:id", authenticateUser, deleteComment)
postsRouter.post("/:id/comments", authenticateUser, createComment)

module.exports = { postsRouter }
