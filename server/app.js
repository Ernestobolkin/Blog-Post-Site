const express = require("express");
require("./dataBase/mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");
const validateLogin = require("./middlewares/validateLogin");
const path = require("path");
require("dotenv").config();
const {
  addUser,
  getAllUsers,
  updateUser,
  login,
  getlUser,
  logout,
  logoutAll,
  uploadPost,
  addComment,
  deletePost,
  deleteComment,
  getAllPosts,
} = require("./routers/user");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "../frontend/build");
app.use(express.static(publicPath));

app.post("/user/add", addUser);

app.post("/user/login", validateLogin, login);

app.post("/user/logout", auth, logout);

app.post("/user/logoutAll", auth, logoutAll);

app.get("/users", auth, getAllUsers);

app.get("/user/self/:email", auth, getlUser);

app.put("/user/update/:email", auth, updateUser);

// for second schema :
app.post("/user/post/", auth, uploadPost);

app.get("/posts", getAllPosts);

app.post("/user/post/comment/", auth, addComment);

app.delete("/user/post/:postId", auth, deletePost);

app.put("/user/post/comment/:postId", auth, deleteComment);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
