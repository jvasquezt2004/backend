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
  let error = req.query.error; // Captura el parámetro de error desde la query si existe
  res.render("login", { title: "Login", query: { error: !!error } }); // Pasa el estado de error a la vista
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Si la contraseña coincide, redirigir al usuario a su página de inicio
      req.session.user = user; // Guardando los detalles del usuario en la sesión
      return res.redirect(`/users/home/${user.name}`);
    } else {
      // Si no coincide, enviar de vuelta al login con un mensaje
      return res.redirect("/users/login?error=true");
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Error logging in");
  }
}
