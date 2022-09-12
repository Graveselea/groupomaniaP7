const mongoose = require('mongoose');//--Infrastructure de modélisation d’objet pour MongoDB dans Node.js
const uniqueValidator = require("mongoose-unique-validator"); // plugin gérant erreur mongoose

const mongooseErrors = require('mongoose-errors')//--Gestionnaire d'erreurs monggose

// Schema post avec type et obligation de chaque champ
const postSchema = mongoose.Schema({
    userId : {type: String, required: true }, //-- l'identifiant MongoDB unique de l'utilisateur qui a créé le post
    name : { type: String, required: true },
    post: {type: String, required: false }, //-- post
    imageUrl: {type: String, required: false }, 
    comments : {type: [
        {
          commenterId:String,
          name: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },//-- Comments
    Date: {
      type: Date,
      default: Date.now
  },
    time: {type: Number, required: false }, //-- Time
    likes: {type: Number, required: false, default: 0 }, //-- nombre d'utilisateurs qui aiment (= likent) le post
    usersLiked: { type: [String], required: false }, //-- tableau des identifiants des utilisateurs qui ont aimé (= liked) le post
}, {
    timestamps: true
});

postSchema.plugin(uniqueValidator); // plugin gérant erreur mongoose appliqué au Schema mongosse

postSchema.plugin(mongooseErrors);

module.exports = mongoose.model('Post', postSchema);