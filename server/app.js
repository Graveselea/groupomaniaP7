const express = require('express');
const app = express();//--Permet de créer une apllication express
const mongoose = require('mongoose');//--BDD
const path = require('path');//--Appel du module path qui permet de manipuler les chemin de système de fichier

const {postsRouter} = require('./routes/posts.router');
const {authRouter} = require('./routes/auth.router');
const {usersRoutes} = require('./routes/users.router');

//--Connection à la base de données
mongoose.connect('mongodb+srv://graveselea:lC7nUgOBbAGNO3Cm@cluster0.nthre.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//--Nota : La méthode use a pour principe d'être écoutée pour tout type de requête tant qu'aucune autre fonction est appellée



//--En-tête de sécurité CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//--Remplacer * par localhost 8000 pour ....
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//--Intercepte toutes les requêtes qui ont un content-type json et met à disposition ce corps de requête sur l'objet requête dans req.body
app.use(express.json());

//--Permet de servir le dossier images
app.use('/images', express.static(path.join(__dirname, 'images'))); //--driname : Importation de node appelée path qui nous donne accès au chemin de notre système de fichier

//Racine de tout ce qui est lié aux posts
app.use('/posts', postsRouter);

//Racine de tout ce qui est lié à l'authentification
app.use('/auth', authRouter)

//Racine de tout ce qui est lié à la récupération des utilisateurs
app.use('/users', usersRoutes)

module.exports = app;//--Exporte l'application pour y accéder depuis les autres fichiers
