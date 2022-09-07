const express = require("express") //appel express
const authRouter = express.Router() // appel express.Router()

// Controllers
const { signup, login } = require("../controllers/users")

authRouter.post("/signup", signup) 
authRouter.post("/login", login)



module.exports = { authRouter }
