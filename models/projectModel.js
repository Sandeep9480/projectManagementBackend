import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  techStack: {
    type: String,
    required: true,
  },
  employee: {
    type: Number,
  },
  deadline: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
