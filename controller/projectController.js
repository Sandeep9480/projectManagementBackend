import Project from "../models/projectModel.js";

// Create a Project
export const createProject = async (req, res) => {
  const { title, img, bio, techStack, deadline } = req.body;

  try {
    if (!title || !img || !bio || !techStack || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProject = new Project({ title, img, bio, techStack, deadline });
    await newProject.save();

    return res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 675af91709c18ee45fb07a66
export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    return res.json({ allProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a Project
export const deleteProject = async (req, res) => {
  const { project_id } = req.body;

  try {
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne(); // Efficiently delete the project
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a Project
export const updateProject = async (req, res) => {
  const { project_id, ...newData } = req.body;
  try {
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    Object.assign(project, newData);
    await project.save();

    return res
      .status(200)
      .json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
