// En userRoutes.js
import UserModel from "../models/users.js";
import bcrypt from "bcryptjs";
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

router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/users/login");
  }
  res.render("profile", { title: "Profile", user: req.session.user });
});

router.post("/profile", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/users/login");
  }

  try {
    const { name, email, password } = req.body;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : req.session.user.password;

    await UserModel.findByIdAndUpdate(req.session.user._id, {
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Actualizar la información en la sesión
    req.session.user = { ...req.session.user, name, email };

    res.redirect("/users/profile");
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).send("Error updating profile");
  }
});

export default router;
