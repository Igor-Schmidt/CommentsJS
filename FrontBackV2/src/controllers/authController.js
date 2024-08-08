const status = require("http-status");
const bcrypt = require("bcryptjs");
const has = require("has-keys");

const userModel = require("../models/userModel.js");

module.exports = class authController {
  // Renders Pages ----------------------------------------
  static async renderLogin(req, res) {
    res.render("auth/login");
  }
  static async renderRegister(req, res) {
    res.render("auth/register");
  }
  static async logout(req, res) {
    req.session.destroy();
    res.redirect("auth/login");
  }
  // ------------------------------------------------------

  static async postLogin(req, res) {
    // Verifica se foi informado email e pwd
    if (has(req.body, ["email", "password"])) {
      const { email, password } = req.body;

      // Procura User no db com base no email
      let user = await userModel.getUserByEmail(email);

      // Verifica User
      if (!user) {
        res.render("auth/login", {
          message: "Usuário não encontrado!",
        });

        // Testa postman
        // res.json({ status: true, message: "User não encontrado" });
        return;
      }

      // Compara Passwords
      const passwordMatch = bcrypt.compareSync(password, user.password);
      // Testa postman
      // res.json({ status: false, message: "a1", passwordMatch});

      // Verifica Pwd
      if (!passwordMatch) {
        res.render("auth/login", {
          message: "Senha inválida!",
        });

        // Testa postman
        // res.json({ status: false, message: "Não são iguais"});
        return;
      }

      // Salva/inicializa sessao de user
      req.session.userEmail = user.email;

      req.flash("message", "Login realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } else {
      // Testa postman
      // res.json({status: false, message: "É necessario especificar email e password!",});

      res.render("auth/login", {
        message: "Necessario especificar email e senha!",
      });
    }
  }

  static async postRegister(req, res) {
    // Verifica se estão todos preenchidos
    if (has(req.body, ["name", "email", "password", "confirmpassword"])) {
      const { name, email, password, confirmpassword } = req.body;

      // Valida confirm pwd
      if (password != confirmpassword) {
        req.flash("message", "Confirmação de senha está incorreta!");
        res.render("auth/register");
        return;
      }

      // Busca user by email
      const checkIfUserExists = await userModel.getUserByEmail(email);

      // Valida email
      if (checkIfUserExists) {
        // Testa postman
        // res.json({ status: true, message: `Email em uso: ${email}`});

        req.flash("message", "O e-mail já está em uso!");
        res.render("auth/register");
        return;
      }

      // Gerando senha encriptada
      const salt = bcrypt.genSaltSync(10); // 10 caracteres randomicos
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = {
        name,
        email,
        password: hashedPassword,
        comments: [],
      };
      try {
        await userModel.createNewUser(user);
        // initialize session
        req.session.userEmail = user.email;

        // console.log('salvou dado')
        // console.log(req.session.userEmail)

        req.flash("message", "Cadastro realizado com sucesso!");

        req.session.save(() => {
          res.redirect("/");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // Testa postman
      // res.json({status: false, message: "Necessario preencher todos os campos! [name, email, password, confirmpassword]",});

      res.render("auth/register", {
        message: "Necessario preencher todos os campos!",
      });
    }
  }
};
