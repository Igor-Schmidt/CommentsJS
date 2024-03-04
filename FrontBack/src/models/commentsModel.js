const conn = require("../db/conn.js");

const comments = {
  async createNewComment(listNewComment, userEmail) {
    const dbo = await conn.getConnectionDB();

    return await dbo.collection("users").findOneAndUpdate({ email: userEmail },{ $set: { comments: listNewComment } },{ returnNewDocument: true });
    // return (await dbo.collection('users').findOneAndUpdate({email: userEmail}, {name: "asdasdasd"}))
  },

  async listComments(userEmail) {
    const dbo = await conn.getConnectionDB();
    const retorno = await dbo.collection("users").find({ email: userEmail }).toArray();

    return retorno[0].comments;
  },
};

module.exports = comments;
