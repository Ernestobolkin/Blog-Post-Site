const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Posts = require("./postSchema");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: function (value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.virtual("posts", {
  ref: "posts",
  localField: "_id",
  foreignField: "owner",
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ email: user.email }, process.env.TOKEN, {
    expiresIn: "1d",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password is invalid");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email or password is invalid");
  }
  return user;
};

UserSchema.statics.findByToken = async (token) => {
  const user = await User.findOne({ "tokens.token": token });
  if (!user) {
    throw new Error("Token has expired");
  }
  return user;
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = model("users", UserSchema);

module.exports = User;
