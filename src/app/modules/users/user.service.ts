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
export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDb,
};
