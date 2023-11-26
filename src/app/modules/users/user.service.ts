import { TUsers } from "./user.interface";
import { userModel } from "./user.model";

const createUserIntoDB = async (userData: TUsers) => {
  // const userData = await userModel.create(user);
  const user = new userModel(userData);
  const result = await user.save();
  console.log(result);
  return result;
};

const getUsersFromDB = async () => {
  const users = await userModel
    .find()
    .select("username fullName age email address userId");
  return users;
};

const getSingleUserFromDb = async (userId: number | string) => {
  const singleUser = await userModel.find({ userId });
  return singleUser;
};

const updateUserIntoDB = async (userId: number, userData: TUsers) => {
  const userExists = await userModel.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  console.log(userId, userData);
  const result = await userModel.findOneAndReplace({ userId }, userData, {
    new: true,
  });

  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const deleteUser = await userModel.deleteOne({ userId });
  return deleteUser;
};

const addOrderIntoDB = async (
  userId: string,
  orderData: {
    productName: string;
    price: number;
    quantity: number;
  }
) => {
  const userExists = await userModel.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const { productName, price, quantity } = orderData;
  await userModel.findOneAndUpdate(
    { userId, orders: { $exists: true } },
    { $push: { orders: { productName, price, quantity } } },
    { upsert: true, new: true }
  );
  return null;
};

// get a user all orders
const getAllOrdersFromDB = async (userId: string) => {
  const userExists = await userModel.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found ");
  }
  const result = await userModel.findOne({ userId }).select("orders");
  return result;
};

// // calculate a user all orders price
// const calculateAllOrders = async (userId: number | string) => {
//   // const userExists = await userModel.isUserExists(userId);
//   // if (!userExists) {
//   //   throw new Error("User not found ");
//   // }
//   const result = await userModel.findOne({ userId }).select("orders");

//   const totalPrice = (result?.orders || []).reduce(
//     (total: number, order: { price?: number; quantity: number }) => {
//       return total + (order.price || 0) * (order.quantity || 0);
//     },
//     0
//   );
//   return totalPrice;
// };

export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDb,
  deleteUserFromDB,
  updateUserIntoDB,
  addOrderIntoDB,
  getAllOrdersFromDB,
  // calculateAllOrders,
};
