const express = require("express") //appel express
const authRouter = express.Router() // appel express.Router()
const auth = require('../middleware/auth')

// Controllers
const { createUser, logUser,getOneUser,getAllUsers } = require("../controllers/users")

authRouter.post("/signup", auth, createUser) 
authRouter.post("/login", auth, logUser)
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getOneUser);


module.exports = { authRouter }
