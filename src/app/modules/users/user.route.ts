import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

//Users routes

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getSingleUser);
router.put("/:userId", UserControllers.updatedUser);
router.delete("/:userId", UserControllers.deletedUser);

// Order Routes
router.put("/:userId/orders", UserControllers.insertOrder);
router.get("/:userId/orders", UserControllers.getUserOrder);
router.get("/:userId/orders/total-price", UserControllers.calculateUserOrder);

export const userRoutes = router;
