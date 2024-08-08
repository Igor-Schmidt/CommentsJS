const commentsModel = require("../models/commentsModel.js");
const userModel = require("../models/userModel.js");

module.exports = class authController {
  // Renders Pages -----------------------------------------
  
  // --- Auth Pages ---
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

  // --- Comments Pages ---
  static async renderHome(req, res) {
    // Lista users cadastrados no db
    // Apartir disso extrai os comentarios que cada user fez
    // Adiciona a uma lista de objetos o nome do user e o comentario que ele criou
    // Essa lista é mandada junto do render que posteriormente é utilizada no corpo da pag.
    // listComments

    // {
    //  userName: name
    //  title: 'comment'
    // }

    const listUsers = await userModel.getAllUsers();
    let listComments = [];

    // Gera lista com comments e user name
    for (const user of listUsers) {
      // Percorre comments de user da vez
      for (const comment of user.comments) {
        
        const createDate = new Date(comment.createAt).toISOString().replace(/T/, " ").replace(/\..+/, "").split(" ")[0];
        const formatDate = `${createDate.split("-")[2]}-${createDate.split("-")[1]}-${createDate.split("-")[0]}`;

        listComments.push({userName: user.name,comment: comment.title,createAt: comment.createAt,formatDate: formatDate,});
      }
    }

    // FILTRANDO POR ORDEM ==========================================================
    let order = "newToOld";
    let listCommentsOrder = [];

    if (req.query.order) {
      order = req.query.order;
    }

    // Filtro Mais novo ao mais antigo
    if (order == "newToOld") {
      listCommentsOrder = listComments.sort((a, b) => b.createAt - a.createAt);
    }
    // Filtro Mais antigo ao mais novo
    else if (order == "oldToNew") {
      listCommentsOrder = listComments.sort((a, b) => a.createAt - b.createAt);
    }
    // ==============================================================================

    // FILTRANDO POR SEARCH =========================================================
    let search = "";
    let commentsQtd = null;

    if (req.query.search) {
      search = req.query.search;

      listCommentsOrder = listCommentsOrder.filter((comment) =>
        comment.comment.includes(search)
      );

      if (listCommentsOrder.length > 0) {
        commentsQtd = listCommentsOrder.length;
      }
    }
    // ==============================================================================
    res.render("comments/home", { listCommentsOrder, commentsQtd, search });
  }

  // Renderiza página para criar comentário
  static async renderCreateComments(req, res) {
    res.render("comments/create");
  }

  // Renderiza página com comments do user logado
  static async renderMyComments(req, res) {
    const userEmail = req.session.userEmail;
    let emptyComments = true;
    let listComments = await commentsModel.listComments(userEmail);

    if (listComments.length > 0) {
      emptyComments = false;
    }

    // const comments = listComments.map((result) => result.title);
    res.render("comments/mycomments", { listComments, emptyComments });
  }

  // Renderiza página do comentário selecionado para edit
  static async renderEditComment(req, res) {
    const userEmail = req.session.userEmail;
    const idSelectedComment = req.params.idComment;

    // Lista todos os comments do user logado
    const listComments = await commentsModel.listComments(userEmail);

    // Pega apenas o comment que bate com o id do selecionado
    const selectedCommentList = listComments.filter(
      (comment) => comment.idComment == idSelectedComment
    );
    const selectedComment = selectedCommentList[0];

    res.render("comments/edit", { selectedComment });
  }
  
  // ------------------------------------------------------
};
