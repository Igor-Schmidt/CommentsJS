const router = require("express").Router();

// Importa controller para criar rota padrao
const pagesCtrl = require("../controllers/pagesController.js");

// --------------------------------------------------------------------
// Importa/adiciona Rotas

// /lists - Rotas de uso via Postman Teste
router.use("/api", require("./testeApiRoutes.js"));

// /pages - Rotas de renderização de paginas
router.use("/pages", require("./pagesRoutes.js"));

// /auth - Adiciona as rotas de auth
router.use("/auth", require("./authRoutes.js"));

// /comments - Adiciona as rotas de comments
router.use("/comments", require("./commentsRoutes.js"));


// / - Adiciona rota padrão
router.use("/", pagesCtrl.renderHome);

// --------------------------------------------------------------------
module.exports = router;
