module.exports.checkAuth = function (req, res, next) {
  // Pega id do user logado
  const userEmail = req.session.userEmail;

  // Caso não ache manda para página de login
  if (!userEmail) {
    res.redirect("/login");
  }

  next();
};
