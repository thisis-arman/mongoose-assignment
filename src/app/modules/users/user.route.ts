import express from "express";
import { createUserController } from "./user.controller";

const router = express.Router();

// router.use("/api/v1/users");

router.post("/", createUserController.createUser);
router.get("/", createUserController.getAllUsers);
router.get("/:userId", createUserController.getSingleUser);
router.put("/:userId", createUserController.getSingleUser);
router.delete("/:userId", createUserController.getSingleUser);

export const userRoutes = router;
