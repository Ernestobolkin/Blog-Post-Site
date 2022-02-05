const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "secretToken");
    const user = await User.findOne({
      email: decoded.email,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    } else {
      req.token = token;
      req.user = user;
      req.email = decoded.email;
      req.useId = user._id.toString();
      req.owner = user._id.toString();
      next();
    }
  } catch (e) {
    res.status(401).send({ error: "Please autenticate" });
  }
};
module.exports = auth;
