const router = require("express").Router();

// Importa controller para criar rota padrao
const commentsController = require("../controllers/commentsController.js");

// --------------------------------------------------------------------
// Importa/adiciona Rotas

// localhost:3000/auth - Adiciona as rotas de auth
router.use("/auth", require("./authRoutes.js"));

// localhost:3000/comments - Adiciona as rotas de auth
router.use("/comments", require("./commentsRoutes.js"));

// localhost:3000/ - Adiciona rota padrão
router.use("/", commentsController.renderHome);

// --------------------------------------------------------------------

module.exports = router;
