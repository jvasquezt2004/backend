// En userRoutes.js
import express from "express";
import {
  registerForm,
  registerUser,
  loginForm,
  loginUser, // Asegúrate de importar loginUser correctamente
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/register", registerForm);
router.post("/register", registerUser);
router.get("/login", loginForm);
router.post("/login", loginUser); // Añadir esta línea es crucial

router.get("/home/:name", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/users/login");
  }
  res.render("home", { title: "Home", user: req.session.user });
});

export default router;
