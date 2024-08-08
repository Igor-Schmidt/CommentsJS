const express = require("express");
const router = express.Router();

// Importa arquivo com funções - controllers
const pagesCtrl = require("../controllers/pagesController.js");
const checkAuth = require("../helpers/authHelper.js").checkAuth;

// Renders Pages ---------------------------------------------------
// Auth
router.get("/login", pagesCtrl.renderLogin);
router.get("/register", pagesCtrl.renderRegister);
router.get("/logout", pagesCtrl.logout);


// Comments
router.get("/mycomments", checkAuth, pagesCtrl.renderMyComments);
router.get("/create", checkAuth, pagesCtrl.renderCreateComments);
router.get("/edit/:idComment", checkAuth, pagesCtrl.renderEditComment);

// Home/List comments
router.get("/home", pagesCtrl.renderHome);
// -----------------------------------------------------------------

module.exports = router;
