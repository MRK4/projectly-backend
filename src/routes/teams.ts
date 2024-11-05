import express from "express";
import * as TeamController from "../controllers/teams";

const router = express.Router();

router.get("/", TeamController.getTeams);
router.post("/", TeamController.createTeam);
router.get("/:id", TeamController.getTeam);
router.put("/:id", TeamController.updateTeam);
router.delete("/:id", TeamController.deleteTeam);
router.get("/user/:userId", TeamController.getTeamsByUserId);

export default router;
