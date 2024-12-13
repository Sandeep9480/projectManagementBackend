import { Router } from "express";
import {
  addUserToProject,
  deleteUserFromProject,
  getAboutUser,
  getAllUser,
  login,
  register,
  updateUser,
} from "../controller/userController.js";

const router = new Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/get_about_user").get(getAboutUser);
router.route("/get_all_user").get(getAllUser);
router.route("/update_user").post(updateUser);
router.route("/add_to_user_project").post(addUserToProject);
router.route("/delete_from_user_project").post(deleteUserFromProject);

export default router;
