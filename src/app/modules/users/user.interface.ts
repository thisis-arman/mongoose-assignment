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
  isDeleted: boolean;
};

export interface UserModel extends Model<TUsers> {
  isUserExists(userId: string): Promise<TUsers> | null;
}

// export type UserModel = Model<"TUsers", Record<string, never>, UserMethods>;
