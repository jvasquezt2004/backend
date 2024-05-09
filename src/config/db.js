import mongoose from "mongoose";

export default class DB {
  static async connectDB() {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("Connected to database");

      const dbConnection = mongoose.connection;
      dbConnection.once("open", () => {
        console.log("Database connection open");
      });

      dbConnection.on("error", (err) => {
        console.error("Error connecting to database:", err);
        process.exit(1);
      });
    } catch (err) {
      console.error("Error connecting to database:", err);
      process.exit(1);
    }
  }
}
