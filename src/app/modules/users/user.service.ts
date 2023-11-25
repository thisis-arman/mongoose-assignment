import { Users } from "./user.interface";
import { userModel } from "./user.model";

const createUserIntoDB = async (user: Users) => {
  const userData = await userModel.create(user);
  console.log(userData);
  return userData;
};

const getUsersFromDB = async () => {
  const users = await userModel.find();
  return users;
};

const getSingleUserFromDb = async (userId: number) => {
  const singleUser = await userModel.find({ userId });
  return singleUser;
};

const deleteUserFromDB = async (userId: number) => {
  const deleteUser = await userModel.deleteOne({ userId });
  return deleteUser;
};
export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDb,
  deleteUserFromDB,
};
