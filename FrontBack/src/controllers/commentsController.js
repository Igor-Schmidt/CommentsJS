const status = require("http-status");
const bcrypt = require("bcryptjs");
const has = require("has-keys");

const commentsModel = require("../models/commentsModel.js");
const userModel = require("../models/userModel.js");

module.exports = class commentController {
  // Renders Pages ----------------------------------------
  // static async renderHome(req, res) {
  //   res.render("comments/home");
  // }
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

  static async createComment(req, res) {
    // Criado um novo cometário, foi optado por cadastrar na collection user mesmo.
    const userEmail = req.session.userEmail;

    // Lista comments que ha no db e adiciona novo comment a lista
    const listNewComment = await commentsModel.listComments(userEmail);

    // Lista IDs dos comments
    const listaIDs = listNewComment.map((result) => result.idComment);

    // Pega o maior número de Id
    let maiorIdComment = 0;
    listaIDs.forEach(function (idComment) {
      if (idComment > maiorIdComment) {
        maiorIdComment = idComment;
      }
    });

    const comment = {
      title: req.body.title,
      idComment: maiorIdComment + 1,
      createAt: new Date(),
    };

    listNewComment.push(comment);

    try {
      await commentsModel.attComments(listNewComment, userEmail);
      console.log("Cometário criado!");

      req.flash("message", "Cometário criado com sucesso!");
      req.session.save(() => {
        res.redirect("/comments/mycomments");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async removeComment(req, res) {
    const userEmail = req.session.userEmail;
    const idCommentRemove = req.body.id;

    // Lista comments que ha no db
    const listComments = await commentsModel.listComments(userEmail);

    // Filtra a lista removendo da selecao o comment com id que sera removido
    const listCommentsAtt = listComments.filter(
      (obj) => obj.idComment != idCommentRemove
    );

    try {
      await commentsModel.attComments(listCommentsAtt, userEmail);
      console.log("Cometário removido!");

      req.flash("message", "Cometário removido com sucesso!");
      req.session.save(() => {
        res.redirect("/comments/mycomments");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async editComment(req, res) {
    const userEmail = req.session.userEmail;

    // Lista comments que ha no db
    const listComments = await commentsModel.listComments(userEmail);
    const { title, idComment } = req.body;

    // Percorre a lista procurando pelo objeto com idComment do editado
    for (const objeto of listComments) {
      if (objeto.idComment == idComment) {
        // Atualiza o campo 'title' do objeto comment e 'createAt'
        objeto.title = title;
        objeto.createAt = new Date();
        break;
      }
    }

    try {
      // Atualizando Comentarios do user
      await commentsModel.attComments(listComments, userEmail);
      console.log("Cometário editado!");

      req.flash("message", "Cometário atualizado com sucesso!");
      req.session.save(() => {
        res.redirect("/comments/mycomments");
      });
    } catch (error) {
      console.log(error);
    }
  }

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
};
