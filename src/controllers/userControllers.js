import UserModel from "../models/users";

export async function registerForm(req, res) {
  res.render("register", { title: "Register" });
}

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserModel.create({ name, email, password });
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
}
