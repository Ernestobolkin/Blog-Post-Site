const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const validateLogin = async (req, res, next) => {
  try {
    let user, token;

    const { email, password } = req.body;
    const tokenBearer = req.header("Authorization");
    if (tokenBearer) {
      token = tokenBearer.split(" ")[1];
      if (!jwt.verify(token, "secretToken")) {
        throw new Error("Token has expired"); 
      }
      user = await User.findByToken(token);
      req.token = token;
      req.user = user;
    } else {
      user = await User.findByCredentials(email, password);
      const generateToken = await user.generateToken();
      req.token = generateToken;
      req.user = user;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateLogin;
