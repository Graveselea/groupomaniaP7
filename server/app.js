const express = require("express");
const app = express(); //--Permet de créer une apllication express
const mongoose = require("mongoose"); //--BDD
const path = require("path"); //--Appel du module path qui permet de manipuler les chemin de système de fichier
const bodyParser = require("body-parser");
const { postsRouter } = require("./routes/posts.router");
const { authRouter } = require("./routes/auth.router");
const { usersRoutes } = require("./routes/users.router");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
//--Connection à la base de données
mongoose
  .connect(
    "mongodb+srv://graveselea:lC7nUgOBbAGNO3Cm@cluster0.nthre.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//--Nota : La méthode use a pour principe d'être écoutée pour tout type de requête tant qu'aucune autre fonction est appellée

//--En-tête de sécurité CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //--Remplacer * par localhost 8000 pour ....
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//--Création compte admin s'il n'existe pas)
User.findOne({ email: process.env.ADMIN_EMAIL }).then((user) => {
  //--Si l'utilisateur n'existe pas
  if (!user) {
    //--Hashage du mot de passe (fondtion asynchrone)
    bcrypt
      .hash(
        //--Récupération du mot de passe envoyé par le frontend dans le corps de la requête
        process.env.ADMIN_PASSWORD,
        //--Nombre d'exécution de l'algorihme de hashage
        10
      )
      .then((hash) => {
        const user = new User({
          //--Crée le compte de l'administrateur s'il nexiste pas
          name: process.env.ADMIN_NAME,
          email: process.env.ADMIN_EMAIL,
          password: hash,
          isAdmin: true,
        });
        user
          .save() //--Enregistrement de l'utilisateur dans la base de donnée et envoi de l'userId et du token au frontend
          .then(() => console.log("Admin créé"))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
});

//--Intercepte toutes les requêtes qui ont un content-type json et met à disposition ce corps de requête sur l'objet requête dans req.body
app.use(express.json());

//--Permet de servir le dossier images
app.use("/images", express.static(path.join(__dirname, "images"))); //--driname : Importation de node appelée path qui nous donne accès au chemin de notre système de fichier

//Racine de tout ce qui est lié aux posts
app.use("/posts", postsRouter);

//Racine de tout ce qui est lié à l'authentification
app.use("/auth", authRouter);

//Racine de tout ce qui est lié à la récupération des utilisateurs
app.use("/users", usersRoutes);

module.exports = app; //--Exporte l'application pour y accéder depuis les autres fichiers
