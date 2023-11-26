import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { UserModel, Users } from "./user.interface";

const userSchema = new Schema<Users, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, "{VALUE} is not valid , usedId must be number"],
  },
  username: {
    type: "String",
    unique: true,
    required: [true, "username is required"],
  },
  password: { type: "String", required: true },
  fullName: {
    firstName: { type: "String", required: true },
    lastName: { type: "String", required: true },
  },
  age: { type: Number, required: true },
  email: { type: "String", required: true, unique: true },
  isActive: { type: "Boolean", required: true },
  hobbies: { type: [String, String], required: true },
  address: {
    street: { type: "String", required: true },
    city: { type: "String", required: true },
    country: { type: "String", required: true },
  },
});

userSchema.pre("save", async function(next) {
  const user = this;
  // hashing password
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.bcrypt_salt_round)
  );
  next();
});

// delete password field when response
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// user exist or not static method
userSchema.statics.isUserExists = async function(userId: number) {
  const existingUser = await userModel.findOne({ userId });
  return existingUser;
};

export const userModel = model<Users, UserModel>("user", userSchema);
