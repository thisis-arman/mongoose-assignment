import { Schema, model } from "mongoose";
import { UserModel, TUsers } from "./user.interface";
// import { string } from "zod";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUsers, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, "UserId is required, and it must be a number"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: [true, "isActive is required"],
  },
  hobbies: {
    type: [String],
    required: [true, "Hobbies are required"],
  },
  address: {
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
  },
  /*  isDeleted: {
    type: Boolean,
    default: false,
  }, */
  orders: [
    {
      productName: {
        type: String,
        required: [true, "Product Name is required"],
      },
      price: { type: Number, required: [true, "Price is required"] },
      quantity: { type: Number, required: [true, "Quantity is required"] },
    },
  ],
});

userSchema.pre("save", async function(this: TUsers, next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

// delete password field when response
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre("find", function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre("findOne", function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match: { $isDeleted: { $ne: true } } });
  next();
});

userSchema.post("save", async function() {
  console.log("from post this", this);
});

// user exist or not static method
userSchema.statics.isUserExists = async function(userId: number) {
  const existingUser = await User.findOne({ userId });
  console.log({ existingUser });
  return existingUser;
};

export const User = model<TUsers, UserModel>("User", userSchema);
