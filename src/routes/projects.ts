import express from "express";
import * as ProjectController from "../controllers/projects";

const router = express.Router();

router.post("/", ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.get("/team/:teamId", ProjectController.getProjectsByTeamId);
router.get("/user/:userId", ProjectController.getProjectsByUserId);

export default router;
