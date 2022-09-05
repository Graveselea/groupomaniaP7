const jwt = require("jsonwebtoken")
require("dotenv").config();

function authenticateUser(req, res, next) {
  const header = req.header("Authorization") // pas sensible à la casse
  if (header == null) return res.status(403).send({ message: "Invalid" })

  const token = header?.split(" ")[1] // récupérer le token avec split
  console.log(token)
  if (token == null) return res.status(403).send({ message: "Token can not be null" })

  jwt.verify(token, process.env.SECRET, (err, _decoded) => {
    if (err) return res.status(403).send({ message: "Token invalid " + err }) // ne va pas plus loin s'il y a erreur
    console.log("Le token est bien valide, on continue")
    next() // car Middleware
  })
}

module.exports = { authenticateUser }