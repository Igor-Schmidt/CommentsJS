const express = require("express");
const routerAuth = express.Router();

// Importa arquivo com funções - controllers
const authController = require("../controllers/authController.js");

// Actions ---------------------------------------------------------
routerAuth.post("/login", authController.postLogin);
routerAuth.post("/register", authController.postRegister);
// -----------------------------------------------------------------

module.exports = routerAuth;
