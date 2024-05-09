import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import DB from "./src/config/db.js";
import session from "express-session";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

DB.connectDB();

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Asegúrate de que esto esté configurado correctamente
  })
);

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
