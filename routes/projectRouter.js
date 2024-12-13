import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controller/projectController.js";

const router = new Router();

router.route("/create_project").post(createProject);
router.route("/get_all_projects").get(getAllProjects);
router.route("/delete_project").post(deleteProject);
router.route("/update_project").post(updateProject);

export default router;
