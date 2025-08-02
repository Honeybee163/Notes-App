import { Schema, model } from "mongoose";

//define schema
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default:[]
    },
  },
  {
    timestamps: true,
  }
);

//create model
let Note = model("Note", noteSchema);

export default Note;
