import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const TagModel = mongoose.model("Tag", tagSchema, "Tags");
export default TagModel;
