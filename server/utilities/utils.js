const User = require("../models/userSchema");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  login,
  getlUser,
  logout,
  logoutAll,
};
