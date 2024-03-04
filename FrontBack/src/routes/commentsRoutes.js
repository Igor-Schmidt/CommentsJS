const express = require("express");
const routerComments = express.Router();

// Importa arquivo com funções - controllers
const commentController = require("../controllers/commentsController.js");
const checkAuth = require("../helpers/authHelper.js").checkAuth;


// Renders Pages ---------------------------------------------------
routerComments.get("/home", commentController.renderHome);
routerComments.get("/mycomments", checkAuth, commentController.renderMyComments);
routerComments.get("/create", checkAuth, commentController.renderCreateComments);
routerComments.get("/edit/:idComment", checkAuth, commentController.renderEditComment);

// Actions ---------------------------------------------------------
routerComments.post("/create", checkAuth, commentController.createComment);
routerComments.post("/remove", checkAuth, commentController.removeComment);
routerComments.post("/edit", checkAuth, commentController.editComment);
// -----------------------------------------------------------------

module.exports = routerComments;
