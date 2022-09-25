const express = require("express"); //appel express
const authRouter = express.Router(); // appel express.Router()

// Controllers
const { signup, login } = require("../controllers/users");

authRouter.post("/signup", signup); //--Enregistrement de nouveaux utilisateurs + Regex pour vérifier que l'email/nom/password est valide
authRouter.post("/login", login); //--Connecter un utilisateur existant

module.exports = { authRouter };
