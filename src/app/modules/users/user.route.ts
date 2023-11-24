import express, { Request, Response } from "express";

const userRouter = express.Router();

userRouter.use("/api/v1/users");

userRouter.post("/create-user", (req: Request, res: Response) => {});
