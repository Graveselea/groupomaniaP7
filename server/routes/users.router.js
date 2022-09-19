const express = require("express");
const usersRoutes = express.Router();
const { authenticateUser } = require("../middleware/auth");
const {
  getAllUsers,
  getOneUser,
  validatedRules,
} = require("../controllers/users");

//--Route GET qui renvoie toutes les utilisateur
usersRoutes.get("/", authenticateUser, getAllUsers);

//--Route GET qui renvoie un utilisateur
usersRoutes.get("/:id", authenticateUser, getOneUser);

//--Route POST qui pour la validation des règles
usersRoutes.post("/:id", authenticateUser, validatedRules);

module.exports = { usersRoutes };
