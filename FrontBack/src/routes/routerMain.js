const router = require("express").Router();

// Importa controller para criar rota padrao
const commentsController = require("../controllers/commentsController.js");

// --------------------------------------------------------------------
// Importa/adiciona Rotas

// localhost:5001/auth - Adiciona as rotas de auth
router.use("/auth", require("./authRoutes.js"));

// localhost:5001/comments - Adiciona as rotas de auth
router.use("/comments", require("./commentsRoutes.js"));

// localhost:5001/lists - Rotas de uso via Postman Teste
router.use("/api", require("./testeApiRoutes.js"));

// localhost:5001/ - Adiciona rota padrão
router.use("/", commentsController.renderHome);

// --------------------------------------------------------------------

module.exports = router;
