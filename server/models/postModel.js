const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); // plugin gérant erreur mongoose

const mongooseErrors = require("mongoose-errors"); //--Gestionnaire d'erreurs monggose

// Schema comment avec type et obligation de chaque champ
const commentsSchema = mongoose.Schema({
  userId: { type: String, required: true }, //--Id de l'utilisateur
  comment: { type: String, required: true }, //--Commentaire
  name: { type: String, required: true }, //--Nom de l'utilisateur
});

// Schema post avec type et obligation de chaque champ
const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true }, //-- l'identifiant MongoDB unique de l'utilisateur qui a créé le post
    name: { type: String, required: true },
    post: { type: String, required: false }, //-- post
    imageUrl: { type: String, required: false }, //-- l'URL de l'image à téléchargée par l'utilisateur
    time: { type: Number, required: false }, //-- Time
    likes: { type: Number, required: false, default: 0 }, //-- nombre d'utilisateurs qui aiment (= likent) le post
    comments: { type: [commentsSchema], required: false }, //-- tableau contenant les commentaires
    usersLiked: { type: [String], required: false }, //-- tableau contenant les identifiants MongoDB des utilisateurs qui ont liké le post
  },
  {
    timestamps: true, //-- Ajoute automatiquement createdAt et updatedAt
  }
);

postSchema.plugin(uniqueValidator);

postSchema.plugin(mongooseErrors);

module.exports = mongoose.model("Post", postSchema);
