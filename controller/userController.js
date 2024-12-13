import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Project from "../models/projectModel.js";

export const register = async (req, res) => {
  const { name, email, password, img } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All Fields Are Required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, img });
    await newUser.save();

    return res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = crypto.randomBytes(30).toString("hex");
    user.token = token;
    await user.save();

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAboutUser = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ token }).populate(
      "projectId",
      "title img  bio  techStack  deadline"
    );
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find().populate(
      "projectId",
      "title img  bio  techStack  deadline"
    );
    return res.json({ allUsers });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addUserToProject = async (req, res) => {
  const { id, project_id } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(400).json({ message: "Project Not Found" });
    }

    if (user.alloted) {
      return res
        .status(400)
        .json({ message: "User is already assigned to a project" });
    }

    user.projectId = project._id;
    user.alloted = true;
    await user.save();

    return res
      .status(200)
      .json({ message: "User Assigned to Project Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserFromProject = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    if (!user.alloted) {
      return res
        .status(400)
        .json({ message: "User is not assigned to any project" });
    }

    user.projectId = null; // Remove the assigned project
    user.alloted = false; // Mark as not alloted
    await user.save();

    return res
      .status(200)
      .json({ message: "User Removed from Project Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { token, ...newData } = req.body;
  console.log(token);

  try {
    // Find the user by token
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    Object.assign(user, newData);
    await user.save();

    return res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    console.error("Error updating user:", error); // Log error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
