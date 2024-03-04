const status = require("http-status");
const bcrypt = require("bcryptjs");
const has = require("has-keys");

const commentsModel = require("../models/commentsModel.js");
const userModel = require("../models/userModel.js");

module.exports = class commentController {
  // Renders Pages ----------------------------------------
  static async renderHome(req, res) {
    res.render("comments/home");
  }
  // Renderiza página para criar comentário
  static async renderCreateComments(req, res) {
    res.render("comments/create");
  }
  // Renderiza página com comments do user logado
  static async renderMyComments(req, res) {
    const userEmail = req.session.userEmail;
    let emptyComments = true;
    let listComments = await commentsModel.listComments(userEmail)
    
    if (listComments.length > 0){
      emptyComments = false
    }

    // const comments = listComments.map((result) => result.title);

    res.render("comments/mycomments", { listComments, emptyComments});
  }
  // Renderiza página do comentário selecionado para edit
  static async renderEditComment(req, res){
    const userEmail = req.session.userEmail;
    const idSelectedComment = req.params.idComment
    
    // Lista todos os comments do user logado
    const listComments = await commentsModel.listComments(userEmail)

    // Pega apenas o comment que bate com o id do selecionado
    const selectedComment = listComments.filter(comment => comment.idComment == idSelectedComment);

    res.render('comments/edit', { selectedComment })
    
  }
  // ------------------------------------------------------

  static async createComment(req, res) {
    // Criado um novo cometário, foi optado por cadastrar na collection user mesmo.
    const userEmail = req.session.userEmail
    
    // Lista comments que ha no db e adiciona novo comment a lista
    const listNewComment = await commentsModel.listComments(userEmail)
    
    // Lista IDs dos comments
    const listaIDs = listNewComment.map((result) => result.idComment);
    
    // Pega o maior número de Id
    let maiorIdComment = 0
    listaIDs.forEach(function(idComment) {
      if (idComment > maiorIdComment) {
        maiorIdComment = idComment
      }
    })
    
    const comment = {"title":req.body.title, "idComment":maiorIdComment+1}
    
    listNewComment.push(comment)

    try {
      await commentsModel.createNewComment(listNewComment, userEmail);

      req.flash("message", "Cometário criado com sucesso!");
      req.session.save(() => {
        res.redirect("/comments/mycomments");
      });

    } catch (error) {
      console.log(error);
    }
  }

  static async removeComment(req, res) {
    const userEmail = req.session.userEmail
    const idCommentRemove = req.body.id

    // Lista comments que ha no db
    const listComments = await commentsModel.listComments(userEmail)

    // Filtra a lista removendo da selecao o comment com id que sera removido
    const listCommentsAtt = listComments.filter(obj => obj.idComment != idCommentRemove);

    try {
      await commentsModel.createNewComment(listCommentsAtt, userEmail);

      req.flash("message", "Cometário removido com sucesso!");
      req.session.save(() => {
        res.redirect("/comments/mycomments");
      });

    } catch (error) {
      console.log(error);
    }
  }

  static async editComment(req, res) {
    try {
      res.render("comments/home");
      console.log('Entrou edit');
    } catch (error) {
      console.log(error);
    }
  }
};
