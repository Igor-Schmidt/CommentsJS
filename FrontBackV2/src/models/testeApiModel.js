const conn = require("../db/conn.js");

const users = {
  async getUsers(query) {
    const dbo = await conn.getConnectionDB();
    return await dbo.collection("users").find(query).toArray();
  },
  async getComments(query) {
    const dbo = await conn.getConnectionDB();
    return await dbo.collection("users").find(query).toArray();
  }
};

module.exports = users;
