import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import DB from "./src/config/db.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

DB.connectDB();

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
