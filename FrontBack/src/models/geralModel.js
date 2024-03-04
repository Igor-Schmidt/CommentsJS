// const conn = require("../db/conn.js")

// const users = {

//     async getAllUsers() {
//         const dbo = await conn.getConnectionDB()
//         return await dbo.collection('users').find().toArray();
//     },

//     async getUserByEmail(userEmail) {
//         const dbo = await conn.getConnectionDB()
//         return await dbo.collection('users').find({email: userEmail}).toArray();
//     },

//     async getUsers() {
//         const dbo = await conn.getConnectionDB()
//         return await dbo.collection('users').find().toArray();
//     },
    
//     async postNewUser(body) {
//         const dbo = await conn.getConnectionDB()
//         // return (await dbo.collection('users').insertOne(good)).ops[0];
//         return (await dbo.collection('users').insertOne(body));
//     }
// }

// module.exports = users;