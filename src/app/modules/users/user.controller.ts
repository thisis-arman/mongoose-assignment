import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { userZodValidation } from "./user.zod.validation";

type Error = {
  message: string;
  details: string;
};
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.users;
    const zodParseData = userZodValidation.UserValidationSchema.parse(user);
    console.log(user);
    const userData = await UserServices.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    // console.log({ error });
    res.status(404).json({
      success: false,
      message: error.message || "User not found",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Get All Users",
      data: users,
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const singleUser = await UserServices.getSingleUserFromDb(userId);
    console.log({ singleUser }, { userId });
    res.status(200).json({
      success: true,
      message: "Get single User",
      data: singleUser,
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

// Update user profile
const updatedUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    const updatedUser = await UserServices.updateUserIntoDB(userId, updateData);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
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

const deletedUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
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
  getAllUsers,
  getSingleUser,
  deletedUser,
  updatedUser,
};
