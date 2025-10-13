import mongoose from "mongoose";

export function ConnectMongoDb() {
  try {
    mongoose.connect(process.env.MDB_URI as string);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected successfully");
    });
  } catch (error) {
    console.log("Connection error! Something went wrong");
    console.log(error);
  }
}
