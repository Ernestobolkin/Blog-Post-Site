const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  email:{
    type:String,
    required: true,
  }
});

const postSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const Posts = model("posts", postSchema);

module.exports = Posts;
