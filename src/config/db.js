import mongoose from "mongoose";

export default class DB {
  static async connectDB() {
    try {
      mongoose.connect(process.env.DB_URL);
    } catch (err) {
      console.error("Error connecting to database");
      process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log("Connected to database");
    });

    dbConnection.on("error", (err) => {
      console.error * "Error connecting";
      process.exit(1);
    });
  }
}
