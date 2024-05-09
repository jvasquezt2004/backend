import mongoose from "mongoose";
import UserModel from "./users";
import TagModel from "./tags";

const ArticleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  },
});

const ArticleModel = mongoose.model("Article", ArticleSchema);

export default ArticleModel;
