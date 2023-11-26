import { Model } from "mongoose";

export type TUsers = {
  userId: "number";
  username: "string";
  password: "string";
  fullName: {
    firstName: "string";
    lastName: "string";
  };
  age: number;
  email: "string";
  isActive: boolean;
  hobbies: ["string", "string"];
  address: {
    street: "string";
    city: "string";
    country: "string";
  };
};

export type UserMethods = {
  isUserExists(userId: number): Promise<TUsers | null>;
};

// export interface UserModel extends Model<Users> {
//   isUserExists(userId: string): Promise<Users> | null;
// }

export type UsersModel = Model<"TUsers", Record<string, never>, UserMethods>;
