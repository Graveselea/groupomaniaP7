const bcrypt = require("bcrypt"); //-- bcrypt permet de crypter le mot de passe
const User = require("../models/userModel"); //--Importation du modèle de données
const jwt = require("jsonwebtoken"); //--Jsonwebtoken pour sécuriser les routes et vérifier que l'utilisateur est bien connecté
require("dotenv").config(); //--Permet de récupérer les variables d'environnement

//--Enregistrement de nouveaux utilisateurs + Regex pour vérifier que l'email/nom/password est valide
function signup(req, res, next) {
  //--Vérification du format du nom
  if (/^([a-zA-Z0-9-_]{2,36})$/g.test(req.body.name)) {
    //--Vérification du format de l'email
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.email)) {
      //--Vérification de la qualité du mot de passe
      if (
        /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g.test(
          req.body.password
        )
      ) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              isAdmin: false,
              isRuleValidated: false,
            });
            user
              .save()
              .then(() =>
                res.status(200).json({
                  message: "Utilisateur créé",
                })
              )
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(401).json({
          message:
            "Votre mot de passe doit contenir au minimum 10 caractères, un chiffre, une minuscule, une majusle, un caratère spécial",
        });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Ceci n'est pas un email valide" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Ceci n'est pas un nom ou pseudonyme valide" });
  }
}

//--Connecter un utilisateur existant
function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            name: user.name,
            rules: user.isRuleValidated,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user._id },

              process.env.SECRET,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}

//--Récupération de tous les utilisateurs
function getAllUsers(req, res, next) {
  User.find()
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
}

//--Récupération d'un utilisateur
function getOneUser(req, res, next) {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
}

//--Validation règles du site
function validatedRules(req, res, next) {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { isRuleValidated: true } }
  )
    .then(() => res.status(200).json({ message: "Règles validées" }))
    .catch((error) => res.status(400).json({ error }));
}

//--Exportation des fonctions
module.exports = {
  signup,
  login,
  getAllUsers,
  getOneUser,
  validatedRules,
};
