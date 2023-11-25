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

const getSingleUserFromDb = async (userId: string) => {
  const singleUser = await userModel.find({ userId });
  return singleUser;
};

const updateUserIntoDB = async (
  userId: string,
  updatedData: Partial<Users>
) => {
  const updatedUser = await userModel.updateOne(
    { userId },
    { $set: updatedData }
  );
  return updatedUser;
};

const deleteUserFromDB = async (userId: string) => {
  const deleteUser = await userModel.deleteOne({ userId });
  return deleteUser;
};

export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDb,
  deleteUserFromDB,
  updateUserIntoDB,
};
