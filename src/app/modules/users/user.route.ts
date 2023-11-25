import express from "express";
import { createUserController } from "./user.controller";

const router = express.Router();

// router.use("/api/v1/users");

router.post("/create-user", createUserController.createUser);

export const userRoutes = router;
