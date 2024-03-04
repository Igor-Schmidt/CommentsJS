const conn = require("../db/conn.js");

const users = {
  async getAllUsers() {
    const dbo = await conn.getConnectionDB();
    return await dbo.collection("users").find().toArray();
  },
  async getUserByEmail(userEmail) {
    const dbo = await conn.getConnectionDB();
    const retorno = await dbo.collection("users").find({ email: userEmail }).toArray();
    return retorno[0];
  },
  async createNewUser(body) {
    const dbo = await conn.getConnectionDB();
    return await dbo.collection("users").insertOne(body);
  },
};

module.exports = users;
