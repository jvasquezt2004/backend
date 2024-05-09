import bcrypt from "bcryptjs";
import UserModel from "../models/users.js";

export async function registerForm(req, res) {
  res.render("register", { title: "Register" });
}

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Cifrar la contraseña antes de guardarla

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.redirect("/users/login"); // Redirigir al usuario a la página de inicio de sesión
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).send("Error registering user");
  }
}

// En userControllers.js
export function loginForm(req, res) {
  res.render("login", { title: "Login" }); // Asegúrate de tener una vista 'login.ejs'
}
