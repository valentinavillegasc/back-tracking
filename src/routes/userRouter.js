const userRouter = require("express").Router();
const registerUser = require("../controllers/User/registerUser");
const confirmEmail = require("../controllers/User/confirmEmail");
const login = require("../controllers/User/Login");
const getAllUsers = require("../controllers/User/getAllUsers");
const getUserById = require("../controllers/User/getUserById");
const updateUser = require("../controllers/User/updateUser");
const deleteUser = require("../controllers/User/deleteUser");
const getBooksByUserId = require("../controllers/User/getBooksByUserId");

//! Register
userRouter.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const newUser = await registerUser(fullname, email, password);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//!Confirm email
userRouter.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const result = await confirmEmail(token);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//!Login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//!Get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//! Get user by ID
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//! Update user
userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { fullname, email, currentPassword, newPassword } = req.body;

  try {
    const user = await updateUser(
      id,
      fullname,
      email,
      currentPassword,
      newPassword
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//! Delete user
userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = deleteUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//! GET BOOKS OF THE ID
userRouter.get("/books/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const usersBooks = await getBooksByUserId(userId);
    res.status(200).json(usersBooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = userRouter;
