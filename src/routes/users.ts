import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/me", UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;
