const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/Projeto_Comments";

const conn = new MongoClient(uri);

// async function run() {
//   try {
//     await conn.connect();
//     console.log("Conectado ao MongoDB...");
//   } catch (error) {
//     console.log(error);
//   }
// }

// run();

// module.exports = conn;

module.exports = {
  async getConnectionDB() {
    if (!global.dbIsConnnected) {
      try {
        await conn.connect();
        console.log("Conectado ao MongoDB...");

        global.dbIsConnnected = true
      } 
      catch (error) {
        console.log(error);
      }
      return conn.db();
    }
    else {
      return conn.db();
    }
    // Tratando autorização do mongodb
    // const reqAuth = req.headers.authorization.split(" ")[1];
    // const reqAuthDecode = Buffer.from(reqAuth, "base64").toString("utf-8");
    // const conn = await MongoClient(`mongodb://${reqAuthDecode}@${banco.host}/Projeto_teste`, banco.options);
  },
};
