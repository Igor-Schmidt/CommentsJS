const express = require("express");
const router = express.Router();

// Importa arquivo com funções - controllers
const ctrlTeste = require("../controllers/testeApiController.js");

// Actions ---------------------------------------------------------
router.get("/list-users", ctrlTeste.getUsers);
router.get("/list-comments", ctrlTeste.getComments);
// -----------------------------------------------------------------

module.exports = router;
