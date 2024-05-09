import express from "express";
import dotenv from "dotenv";
import DB from "./src/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
console.log(port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
