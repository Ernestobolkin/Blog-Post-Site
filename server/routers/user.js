const User = require("../models/userSchema");
const Posts = require("../models/postSchema");
const mongoose = require("mongoose");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const data = {
      name,
      email,
      password,
    };
    const user = await User.create(data);
    const token = await user.generateToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  const usersData = await User.find();
  if (usersData.length <= 0) {
    res.status(200).send("Sorry, There Is No Users To Show");
  } else {
    res.status(400).send(usersData);
  }
};

const getlUser = async (req, res) => {
  const { email } = req.params;
  const usersData = await User.findOne({ email });
  res.status(200).send(["User was found", usersData]);
};

const updateUser = async (req, res) => {
  const { email } = req.params;
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.password = password;
      user.name = name;
      await user.save();
      res.status(200).send(user);
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = req;
    res.status(200).send(["Logged In", user, token]);
  } catch (error) {
    if (error.message.includes("expired")) {
      const user = await User.findByToken(token);
      if (user) {
        user.tokens = user.tokens.filter(
          (filToken) => filToken.token !== token
        );
        await user.save();
      }
    }
    res.status(400).send(["ERROR", error]);
  }
};

const logout = async (req, res) => {
  const { user, token } = req;
  try {
    user.tokens = user.tokens.filter((filToken) => filToken.token !== token);
    await user.save();
    res.send("Logged Out");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logged Out");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// post schema

const uploadPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const postData = {
      userName: req.user.name,
      title,
      content,
      owner: req.owner,
      email: req.email,
    };
    const createdPost = await Posts.create(postData);
    res.send(["post Created", createdPost]);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const addComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const postData = {
      userId: req.useId,
      userName: req.user.name,
      content,
    };
    const id = mongoose.Types.ObjectId(postId);
    const test = await Posts.findById({ _id: id });
    if (test === null) {
      throw new Error("sorry no post with that id");
    }
    const newPost = await Posts.findByIdAndUpdate(
      { _id: id },
      { $push: { comments: postData } }
    );
    res.status(200).send(["comment created successfully", newPost]);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findById({ _id: postId });
    if (post.owner.toString() === req.useId) {
      const removedPost = await Posts.deleteOne({ _id: postId });
      res.status(200).send(["post deleted", removedPost]);
    } else {
      throw new Error("sorry user cannot remove other users post");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId, commentUserId } = req.body;
    const { postId } = req.params;
    const remover = req.useId;

    if (commentUserId !== remover) throw new Error("NOT VALID");
    const newCommnets = await Posts.findByIdAndUpdate(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    res.send(newCommnets);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getAllPosts = async (req, res) => {
  const posts = await Posts.find({});
  res.status(200).send(posts);
};

module.exports = {
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
};
