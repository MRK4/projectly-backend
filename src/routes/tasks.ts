import express from "express";
import * as TaskController from "../controllers/tasks";

const router = express.Router();

router.post("/", TaskController.createTask);
router.get("/:id", TaskController.getTaskById);
router.get("/project/:projectId", TaskController.getTasksByProjectId);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
