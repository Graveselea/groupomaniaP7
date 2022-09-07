const express = require("express") //appel express

// Controllers
const {
  getAllPosts,
  createPost,
  getOnePost,
  deletePost,
  modifyPost,
  likePost,
} = require("../controllers/posts")

// Middleware
const multer = require("../middleware/multer")
const { authenticateUser } = require("../middleware/auth")

const postsRouter = express.Router(); // appel express.Router()
const bodyParser = require('body-parser');

postsRouter.use(bodyParser.json())

postsRouter.post("/",authenticateUser,multer,createPost)
postsRouter.put("/:id", authenticateUser, multer, modifyPost)
postsRouter.delete("/:id", authenticateUser, deletePost) // :id = (deux points) variable
postsRouter.get("/:id", authenticateUser, getOnePost) // :id = (deux points) variable
postsRouter.get("/", authenticateUser, getAllPosts)
postsRouter.post("/:id/like", authenticateUser, likePost)

module.exports = { postsRouter }
