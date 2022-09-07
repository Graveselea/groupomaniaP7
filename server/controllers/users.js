//--Cryptage des mots de passes
const bcrypt = require('bcrypt'); //--Fonction de hachage ou Package de chiffrement
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');//--permet l'échange sécurisé de jetons entre plusieurs parties pour vérifier l’authenticité et l’intégrité des données
require("dotenv").config();//--Package de configuration des variables d’environnement

//--Enregistrement de nouveaux utilisateurs
function signup (req, res, next) {
//--Vérification du format du nom
    if(/^([a-zA-Z0-9-_]{2,36})$/g.test(req.body.name)){
//--Vérification du format de l'email
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.email)){
//--Vérification de la qualité du mot de passe
            if (/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g.test(req.body.password)) {
            //--Hashage du mot de passe (fondtion asynchrone)
            bcrypt.hash(
            //--Récupération du mot de passe envoyé par le frontend dans le corps de la requête
                req.body.password, 
            //--Nombre d'exécution de l'algorihme de hashage
                10)
                .then(hash => {
                    const user = new User({//--Crée un nouvel utilisateur avec le mot de passe crypté, le nom et l'adresse mail passée dans le corps de la requête
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        isAdmin : false,
                        isRuleValidated : false,
                    })
                    user.save()//--Enregistrement de l'utilisateur dans la base de donnée et envoi de l'userId et du token au frontend
                        .then(() => res.status(200).json({
                            message: "Utilisateur créé",
                        }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error })); 
            }else {
            return res.status(401).json({ message: "Votre mot de passe doit contenir au minimum 10 caractères, un chiffre, une minuscule, une majusle, un caratère spécial" })
        }
   
        }else {
        return res.status(401).json({ message: "Ceci n'est pas un email valide" })
    }
    }else {
        return res.status(401).json({ message: "Ceci n'est pas un nom ou pseudonyme valide" })
    }
};

//--Connecter un utilisateur existant
function login  (req, res, next) {
    User.findOne({ email: req.body.email })
        .then(user => {
//--Si l'utilisateur n'existe pas
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'})
            }
//--Si l'utilisateur existe, avec bcrypt on compare le mot de pass envoyé par l'utillisateur et celui enregistré dans la base de donnée
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'})
                }
//--Si l'email et le mot de passe son OK, on renvoit au frontend ce qu'il attend > L'userId, le name et le token
                res.status(200).json({
                    userId: user._id,
                    name:user.name,
//--Création du token
                    token: jwt.sign(//--Pour la fonction sign
//--Argument 1 : payload = Données que l'on encode si on veut en encoder
                        { userId: user._id },
//--Argumnt 2 : Clé secrète pour l'encodage
                        process.env.SECRET,
//--Argument 3 de configuration : Le token expirera au bout de 24h
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


//Récupération de tous les utilisateurs
function getAllUsers (req, res, next)  {
    User.find()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

//Récupération d'un utilisateur
function getOneUser (req, res, next) {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

module.exports = {
    signup,
    login,
    getAllUsers,
    getOneUser
};