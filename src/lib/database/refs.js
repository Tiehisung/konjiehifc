// 'use server'

// const { MongoClient } = require("mongodb");

// const saveToDatabase = async ({ file }) => {
//   const client = await MongoClient.connect(process.env.MDB_URI);
//   const db = client.db("sos-port");
//   const insert = await db.collection("files").insertOne(file);
//   if (insert.acknowledged) {
//     console.log(insert);
//   } else {
//     console.log("failed");
//   }
// };
// export default saveToDatabase;
