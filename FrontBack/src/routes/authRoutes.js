const express = require("express");
const routerAuth = express.Router();

// Importa arquivo com funções - controllers
const authController = require("../controllers/authController.js");

// -----------------------------------------------------------------
// localhost:5001/auth/

// Renders Pages ---------------------------------------------------
routerAuth.get("/login", authController.renderLogin);
routerAuth.get("/register", authController.renderRegister);

// Actions ---------------------------------------------------------
routerAuth.post("/login", authController.postLogin);
routerAuth.post("/register", authController.postRegister);

routerAuth.get("/logout", authController.logout);
// -----------------------------------------------------------------

module.exports = routerAuth;
