import express from "express";
import { createUserController } from "./user.controller";

const router = express.Router();

router.post("/", createUserController.createUser);
router.get("/", createUserController.getAllUsers);
router.get("/:userId", createUserController.getSingleUser);
router.put("/:userId", createUserController.updatedUser);
router.delete("/:userId", createUserController.deletedUser);

export const userRoutes = router;
