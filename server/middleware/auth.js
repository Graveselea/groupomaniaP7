const jwt = require("jsonwebtoken"); //-- Vérification de l'authentification de l'utilisateur
require("dotenv").config(); //--Permet de récupérer les variables d'environnement

//-- Vérification de l'authentification de l'utilisateur
async function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "ID utilisateur non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
}

module.exports = { authenticateUser };
