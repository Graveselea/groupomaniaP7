const mongoose = require("mongoose"); //--Infrastructure de modélisation d’objet pour MongoDB dans Node.js
const uniqueValidator = require("mongoose-unique-validator"); // plugin gérant erreur mongoose

const mongooseErrors = require("mongoose-errors"); //--Gestionnaire d'erreurs monggose

//-- Schema User avec type et obligation de chaque champ
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    }, // email unique et obligatoire
    password: { type: String, required: true }, // password obligatoire
    name: { type: String, required: true }, // name obligatoire
    isAdmin: { type: Boolean, required: true, default: false }, // admin obligatoire
    isRuleValidated: { type: Boolean, required: true, default: false }, // règle obligatoire
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);
userSchema.plugin(uniqueValidator);

userSchema.plugin(mongooseErrors);

module.exports = mongoose.model("User", userSchema);
