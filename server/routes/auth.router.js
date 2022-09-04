const express = require("express") //appel express
const authRouter = express.Router() // appel express.Router()

// Controllers
const { createUser, logUser } = require("../controllers/users")

authRouter.post("/signup", createUser) 
authRouter.post("/login", logUser)

module.exports = { authRouter }
