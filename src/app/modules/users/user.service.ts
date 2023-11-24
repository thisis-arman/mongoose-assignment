import { Users } from "./user.interface";
import { userModel } from "./user.model";

const createUserIntoDB = async (user: Users) => {
  const userData = await userModel.create(user);
  return userData;
};

export const createUserServices = {
  createUserIntoDB,
};
