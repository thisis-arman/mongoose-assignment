import { Request, Response } from "express";
import { createUserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = req.body;
    const userData = await createUserServices.createUserIntoDB(result);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const createUserController = {
  createUser,
};
