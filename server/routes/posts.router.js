const express = require("express") //appel express

// Controllers
const {
  getPosts,
  createPosts,
  getPostById,
  deletePost,
  modifyPost,
  likePost,
} = require("../controllers/posts")

// Middleware
const { upload } = require("../middleware/multer")
const { authenticateUser } = require("../middleware/auth")

const postsRouter = express.Router(); // appel express.Router()
const bodyParser = require('body-parser');

postsRouter.use(bodyParser.json())

postsRouter.get("/", authenticateUser, getPosts)
postsRouter.post("/",authenticateUser,upload.single("image"),createPosts)
postsRouter.get("/:id", authenticateUser, getPostById) // :id = (deux points) variable
postsRouter.delete("/:id", authenticateUser, deletePost) // :id = (deux points) variable
postsRouter.put("/:id", authenticateUser, upload.single("image"), modifyPost)
postsRouter.post("/:id/like", authenticateUser, likePost)

module.exports = { postsRouter }
