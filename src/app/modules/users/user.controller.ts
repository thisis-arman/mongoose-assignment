import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { userZodValidation } from "./user.zod.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.users;
    const zodParseData = userZodValidation.UserValidationSchema.parse(user);

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
      message: "User not found",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: "users Fetched successfully",
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
    const userId = Number(req.params.userId);
    const singleUser = await UserServices.getSingleUserFromDb(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
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
/* const updatedUser = async (req: Request, res: Response) => {


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
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not found",
      error: error,
    });
  }
};
 */

const updatedUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updateData = req.body;
    console.log("updated data from the req body", { updateData });

    const updatedUser = await UserServices.updateUserIntoDB(userId, updateData);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "user no fai",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("updated user theke error", { error });
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error,
    });
  }
};

const deletedUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
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

// insert a order
const insertOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const order = req.body;
    const zodOrderParse = userZodValidation.ordersSchema.parse(order);
    const result = await UserServices.addOrderIntoDB(userId, zodOrderParse);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

// get a user order
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getAllOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

// // calculate a user order
const calculateUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const totalPrice = await UserServices.calculateAllOrders(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deletedUser,
  updatedUser,
  getUserOrder,
  insertOrder,
  calculateUserOrder,
};
