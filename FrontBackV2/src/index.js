
// Dependencias require -------------------------------------------------------------------------
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session); // Salva arquivos de session em server
const flash = require("express-flash");
const path = require("path");
const config = require('../../config.json')
// ----------------------------------------------------------------------------------------------

// Vars Global ----------------------------------------------------------------------------------
global.dbIsConnnected = false;
// ----------------------------------------------------------------------------------------------

// Config instancia App -------------------------------------------------------------------------

// Criar instancia app
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views/")); // Set local views 
app.use(express.static(path.join(__dirname, "public/"))); // Set public path com diversos como CSS, imgs, etc
app.use(flash()); // Config Flash menssagens, mensagens de status do sistema
// ----------------------------------------------------------------------------------------------

// Middleware que recebe/formata para body json as requisições ----------------------------------
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// ----------------------------------------------------------------------------------------------

// Middleware de session ------------------------------------------------------------------------
app.use(
  session({
    name: "session",
    secret: "secret",
    resave: false,
    saveUninitialized: false,

    store: new FileStore({
      logFn: function () { },
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),

    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);
// ----------------------------------------------------------------------------------------------

// Config res session ---------------------------------------------------------------------------
// Verificar se user está logado
app.use((req, res, next) => {
  // Caso exista o userEmail tal dentro de sessions então...
  // Significa que está logado dai manda o que ha em sessions
  if (req.session.userEmail) {
    res.locals.session = req.session;
  }
  next();
});

// Adicionando Rotas
app.use("/", require("./routes/main.js"));
// ----------------------------------------------------------------------------------------------

// Inicializa server/frontend -------------------------------------------------------------------
try {
  app.listen(
    config.portas.frontend,
    () => console.info('\nFrontend Rodando em:', config.portas.frontend)
  );
} catch (error) {
  console.log('[ERRO] - Erro ao inicializar o Frontend: \n', error);
}
// ----------------------------------------------------------------------------------------------