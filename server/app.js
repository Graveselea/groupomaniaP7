const express = require("express"); //appel express
const app = express(); //--Création de l'application express
const mongoose = require("mongoose"); //--Connexion à la base de données MongoDB
const path = require("path"); //--Gestion des chemins de fichiers
const bodyParser = require("body-parser");
const { postsRouter } = require("./routes/posts.router"); //--Importation du router posts
const { authRouter } = require("./routes/auth.router"); //--Importation du router auth
const { usersRoutes } = require("./routes/users.router"); //--Importation du router users
const User = require("./models/userModel"); //--Importation du modèle user
const bcrypt = require("bcrypt"); //--Bcrypt pour crypter le mot de passe

//--Connection à la base de données
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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
  if (!user) {
    bcrypt
      .hash(process.env.ADMIN_PASSWORD, 10)
      .then((hash) => {
        const user = new User({
          name: process.env.ADMIN_NAME,
          email: process.env.ADMIN_EMAIL,
          password: hash,
          isAdmin: true,
        });
        user
          .save() //--Enregistrement du compte admin
          .then(() => console.log("Admin créé"))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
});

app.use(express.json()); //--Permet de transformer le corps de la requête en objet JS utilisable
app.use("/images", express.static(path.join(__dirname, "images"))); //--donne accès au dossier images

//--Routes
app.use("/posts", postsRouter); //-- Utilisation du router posts
app.use("/auth", authRouter); //-- Utilisation du router auth
app.use("/users", usersRoutes); //-- Utilisation du router users

module.exports = app; //--Exportation de l'application
