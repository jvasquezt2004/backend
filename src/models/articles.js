import mongoose from "mongoose";
import UserModel from "./userModel";
import TagModel from "./tagModel";

const articleSchema = new mongoose.Schema({
  title: {
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
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

const ArticleModel = mongoose.model("Article", articleSchema, "Articles");
export default ArticleModel;
