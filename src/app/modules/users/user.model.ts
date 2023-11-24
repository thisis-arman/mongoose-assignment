import { Schema, model } from "mongoose";
import { users } from "./user.interface";

const userSchema = new Schema<users>({
  userId: { type: "String", unique: true, required: true },
  username: { type: "String", unique: true, required: true },
  password: { type: "String", required: true },
  fullName: {
    firstName: { type: "String", required: true },
    lastName: { type: "String", required: true },
  },
  age: { type: "Number", required: true },
  email: { type: "String", required: true, unique: true },
  isActive: { type: "Boolean", required: true },
  hobbies: { type: [String, String], required: true },
  address: {
    street: { type: "String", required: true },
    city: { type: "String", required: true },
    country: { type: "String", required: true },
  },
});

export const userModel = model<users>("user", userSchema);
