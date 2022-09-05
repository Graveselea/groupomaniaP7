const { User } = require("../models/mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();//--Package de configuration des variables d’environnement

// création profil utilisateur
async function createUser(req, res) {
  try {
    //--Vérification du format du nom
    if(/^([a-zA-Z0-9-_]{2,36})$/g.test(req.body.name)){
      //--Vérification du format de l'email
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.email)){
      //--Vérification de la qualité du mot de passe
    if (/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g.test(req.body.password)){ 
    //--Hashage du mot de passe (fonction asynchrone)
    const {email, password, name, userId} = req.body
    const hashedPassword = await hashPassword(password);
    const user = new User({ userId, name, email, password: hashedPassword, isAdmin: false, isRuleValidated: false }); //création objet
    await user.save(); // sauvegarde objet
    res.status(201).send({ message: "Utilisateur enregistré !" });
    }
  }
}
  } catch (err) {
    res.status(409).send({ message: "Utilisateur non enregistré " + err });
  }
}

// hasher password
function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// retrouver utilisateur pour login
async function logUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) {
      res.status(403).send({ message: "Mot de passe incorrect" });
    }
    const token = createToken(email);
    res.status(200).send({ userId: user._id, token: token, name:user.name, isAdmin:user.isAdmin, isRuleValidated:user.isRuleValidated });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erreur interne" });
  }
}

// Function création token
function createToken(email) {
  const jwtPassword = process.env.SECRET;
  return jwt.sign({ email: email, userId: User._id}, jwtPassword, { expiresIn: "24h" }); //token pour utilisateur grâce à JWT
}


function getllUsers(req, res) {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
}

function getOneUser(req, res) {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
}

module.exports = { createUser, logUser, getllUsers, getOneUser };
