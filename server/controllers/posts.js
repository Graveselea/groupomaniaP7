const mongoose = require("mongoose")
const { send } = require("process")
const unlink = require("fs").promises.unlink // Supprime de manière asynchrone un fichier avec une promesse
const mongooseErrors = require('mongoose-errors')

// Schema post avec type et obligation de chaque champ
const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  imageUrl: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
  comments : {type: [
    {
      commenterId:String,
      commenterPseudo: String,
      text: String,
      timestamp: Number,
    }
  ],
  required: true,
},
  date: { type: Date, default: Date.now }, // date obligatoire
udaptedAt: { type: Date, default: Date.now }, // date udapte obligatoire
});

postSchema.plugin(mongooseErrors);
const Post = mongoose.model("Post", postSchema)

// Fonction pour récupérer tous les posts
function getPosts(req, res) {
  //Post.deleteMany({}) // pour tout supprimer de la base de donnée
  Post.find({})
    .then((posts) => res.send(posts))
    .catch((error) => res.status(500).send(error))
}


// Funtion récupérer params id
function getPost(req, res) {
  const { id } = req.params; // Id récupérer des params dans l'url
  return Post.findById(id)
}

// Fonction récupérer post par Id
function getPostById(req, res) {
  getPost(req, res)
  .then((post) => sendClientResponse(post, res))
  .catch((err) => res.status(500).send(err))
}
// Fonction supprimer post par Id
function deletePost(req, res) {
  const { id } = req.params // Id récupérer des params
  Post.findByIdAndDelete(id)
  .then((posted) => sendClientResponse(posted, res))
  .then((item) => deleteImage(item))
  .catch((err) => res.status(500).send({ message: err }))
}

// function modifier Post
function modifyPost(req, res) {
  const {
    params: { id },
  } = req; // récupérer id dans url
  const hasNewImage = req.file != null // un seul égal pour gérer le cas undefined
  const payload = makePayload(hasNewImage, req)
    // Actualise le post
  Post.findByIdAndUpdate(id, payload)
  .then((dbResponse) => sendClientResponse(dbResponse, res))
  .then((produit) => deleteImage(produit))
  .catch((err) => console.error("PROBLEM UPDATING", err))
}

// Fonction supprimer l'image local
function deleteImage(produit) {
  if (produit == null) return
  const fileToDelete = produit.imageUrl.split("/").at(-1) // split pour diviser l'adresse, at(-1) pour récupérer le dernier élément
  return unlink("images/" + fileToDelete) // méthode d'api fs(findsystem) pour supprimer l'image local et gère l'erreur si l'image n'existe pas en local// promise chaining
  //return car deux then dans deletePost
}

function makePayload(hasNewImage, req) {
  if (!hasNewImage) return req.body
  const payload = JSON.parse(req.body.post)
  payload.imageUrl = makeImageUrl(req, req.file.fullName)
  return payload
}

// function pour vérifier si le produit est bien dans la base de donnée
function sendClientResponse(post, res) {
  if (post == null) {
    // si la réponse est nulle
    return res.status(404).send({ message: "Object not found in database" })
  }
  return Promise.resolve(res.status(200).send(post)).then(() => post)
}

// Function création de l'url de l'image
function makeImageUrl(req, fullName) {
  return req.protocol + "://" + req.get("host") + "/uploads/" + fullName // Url complet de l'image avec le nom du fichier
}

// Fonction pour ajouter un post
function createPosts(req, res) {
  const { body, file } = req
  const { fullName } = file
  const post = JSON.parse(body.post) // req.body grâce à multer et body-parser dans Express
  const { name, surname, content, email, userId } = post

  // Data Post
  const posted = new Post({
    userId,
    name,
    surname,
    content,
    email,
    imageUrl: makeImageUrl(req, fullName),
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    date: new Date(req.params.date || moment().format("YYYY-MM-DD HH:mm:ss")),
    udaptedAt: new Date(req.params.udaptedAt || moment().format("YYYY-MM-DD HH:mm:ss")),
  })
  posted
    .save()
    .then((message) => res.status(201).send({ message }))    
    .catch((err) => res.status(500).send(err))
}

function likePost(req, res) {
  const { like, userId } = req.body // récupérer like et userId dans le body
  if (![1, -1, 0].includes(like)) return res.status(403).send({ message: "Invalid like value" }) // si like n'est pas 1 ou -1 on renvoie un status 403

  getPost(req, res)// récupérer le post
    .then((post) => udapteVote(post, like, userId, res)) // update vote
    .then((pr) => pr.save()) // sauvegarde du post
    .then((prod) => sendClientResponse(prod, res)) // renvoie du post
    .catch((error) => res.status(500).send(error)) // envoie d'un status 500 si erreur
}

function udapteVote(post, like, userId, res) {
  if (like === 1 || like === -1) return incrementVote(post, userId, like); // si like = 1 ou -1 on incrémente le vote 
  return resetVote(post, userId, res)
}

function resetVote(post, userId, res) {
  const { usersLiked, usersDisliked } = post

  if ([usersLiked, usersDisliked].every((arr) => arr.includes(userId))) // si l'utilisateur est dans les deux tableaux
    return Promise.reject("User seems to have voted both away") // every pour tester si tous les éléments d'un tableau sont vrai

  if (![usersLiked, usersDisliked].some((arr) => arr.includes(userId))) // si l'utilisateur n'est pas dans les deux tableaux
    return Promise.reject("User seems to have not voted") // some pour tester si au moins un élément d'un tableau est vrai

  if (usersLiked.includes(userId)) {
    --post.likes // si l'utilisateur a voté pour, on décrémente le nombre de likes
    post.usersLiked = post.usersLiked.filter((id) => id !== userId) // on supprime l'id de l'utilisateur dans le tableau usersLiked
  } else {
    --post.dislikes // si l'utilisateur a voté contre, on décrémente le nombre de dislikes
    post.usersDisliked = post.usersDisliked.filter((id) => id !== userId) // on supprime l'id de l'utilisateur dans le tableau usersDisliked
  }
  return post
}

function incrementVote(post, userId, like) {
  const { usersLiked, usersDisliked } = post

  const votersArray = like === 1 ? usersLiked : usersDisliked; // conditional Operator pour déterminer quel tableau utiliser
  if (votersArray.includes(userId)) return post // si l'utilisateur a déjà voté, on ne fait rien
  votersArray.push(userId); // ajouter l'id de l'utilisateur à la liste des votants

  like === 1 ? post.likes++ : post.dislikes++; // si like = 1 on incrémente le nombre de likes, sinon on incrémente le nombre de dislikes
  return post
}

module.exports = {
  sendClientResponse,
  getPost,
  getPosts,
  createPosts,
  getPostById,
  modifyPost,
  deletePost,
  likePost,
}
