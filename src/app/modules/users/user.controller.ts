import { Request, Response } from "express";
import { createUserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.users;
    console.log(user);
    const userData = await createUserServices.createUserIntoDB(user);
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
