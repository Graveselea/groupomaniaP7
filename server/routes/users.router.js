const express = require("express");
const usersRoutes = express.Router();
const { authenticateUser } = require("../middleware/auth");

// Controllers
const {
  getAllUsers,
  getOneUser,
  validatedRules,
} = require("../controllers/users");

usersRoutes.get("/", authenticateUser, getAllUsers); // affichage users
usersRoutes.get("/:id", authenticateUser, getOneUser); // :id = (deux points) variable + récupération d'un user
usersRoutes.post("/:id", authenticateUser, validatedRules); // :id = (deux points) variable + validation des règles

module.exports = { usersRoutes };
