const { app, express } = require("./app")
const { postsRouter } = require("./routes/posts.router")
const { authRouter } = require("./routes/auth.router")
const port = 8000; // port d'écoute du serveur
const path = require("path") // appel path déjà installé avec node
const bodyParser = require("body-parser") 

// Connection to database
require("./models/mongo.js")

// Middleware
app.use(bodyParser.json())
app.use("/posts", postsRouter)
app.use("/auth", authRouter)



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes
app.get("/", (req, res) => {
  // méthode GET sur chemin absolu + résulat dans premier argument sur le deuxième un objet
  res.send("Hello World!") // serveur renvoie Hello World!
})

// Listen
  // Affichage photo
app.use("/images", express.static(path.join(__dirname, "images"))) // Middleware pour uploader une photo et le nom du dossier ne fait pas parti de l'url il faut donc ajouter le nom du dossier /images
app.listen(port, () => {
  // function sans argument qui écoute un port + résultat
  console.log(`Listening on port ${port}`)
});
