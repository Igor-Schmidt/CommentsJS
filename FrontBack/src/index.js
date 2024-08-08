// ----------------------------------------------------------------------------------------------

// Dependencias require
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session); // Salva arquivos de session em server
const flash = require("express-flash");
const path = require("path");

// ----------------------------------------------------------------------------------------------
// Vars Global
global.dbIsConnnected = false;
// ----------------------------------------------------------------------------------------------

// Porta a ser utilizada
const { PORT } = process.env;

// Conexao com Banco MongoDB
const conn = require("./db/conn.js");
const { log } = require("console");

// Criar instancia app
const app = express();

// ----------------------------------------------------------------------------------------------
// Config instancia App
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views/"));

// ----------------------------------------------------------------------------------------------

// Middleware que recebe body json
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Middleware de session
app.use(
  session({
    name: "session",
    secret: "secret",
    resave: false,
    saveUninitialized: false,

    store: new FileStore({
      logFn: function () {},
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
// Config Flash menssagens, mensagens de status do sistema
app.use(flash());

// Config Public Path
app.use(express.static(path.join(__dirname, "public/")));

// Config res session
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
app.use("/", require("./routes/routerMain.js"));

// ----------------------------------------------------------------------------------------------

try {
  conn.getConnectionDB();
  app.listen(5001);
  console.log("Rodando na porta:", 5001);
} catch (error) {
  console.log(error);
}
