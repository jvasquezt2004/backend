import express from "express";
import {
  registerForm,
  registerUser,
  loginForm,
} from "../controllers/userControllers.js"; // Asegúrate de importar loginUser

const router = express.Router();

router.get("/register", registerForm);
router.post("/register", registerUser);
router.get("/login", loginForm); // Asegúrate de que loginUser está correctamente importado

export default router;
