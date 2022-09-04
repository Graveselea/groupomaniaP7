const uniqueValidator = require("mongoose-unique-validator"); // plugin gérant erreur mongoose
const mongoose = require("mongoose"); // connection du mongoose
const mongooseErrors = require('mongoose-errors')

//database
mongoose.connect('mongodb+srv://graveselea:lC7nUgOBbAGNO3Cm@cluster0.nthre.mongodb.net/?retryWrites=true&w=majority'),
  function (err) {
    // Connection à Mongo grâce à .env
    if (err) {
      throw err;
    }
  };
console.log(
  "message de connection à la base de données",
  mongoose.connection.readyState
);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: [true, "Un email est requis"] }, // email unique et obligatoire
  password: { type: String, required: true }, // password obligatoire
  name: { type: String, required: [true, "Un nom est requis"] }, // name obligatoire
  isAdmin: { type: Boolean, required: true, default: false }, // admin obligatoire
  isRuleValidated: { type: Boolean, required: true, default: false }, // règle obligatoire

});
userSchema.plugin(uniqueValidator); // plugin gérant erreur mongoose appliqué au Schema mongosse

userSchema.plugin(mongooseErrors);
const User = mongoose.model("User", userSchema);



module.exports = { mongoose, User };