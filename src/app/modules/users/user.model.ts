import { Schema, model } from "mongoose";
// import bcrypt from "bcrypt";
import { UsersModel, TUsers, UserMethods } from "./user.interface";

const userSchema = new Schema<TUsers, UsersModel, UserMethods>({
  userId: {
    type: Number,
    unique: true,
    required: [true, "UserId is required, and it must be a number"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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
    type: [String, String],
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
});

// userSchema.pre("save", async function(next) {
//   const user = this;
//   // hashing password
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(process.env.bcrypt_salt_round)
//   );
//   next();
// });

// // delete password field when response
// userSchema.methods.toJSON = function() {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

// user exist or not static method
userSchema.methods.isUserExists = async function(userId: number) {
  const existingUser = await userModel.findOne({ userId });
  return existingUser;
};

export const userModel = model<TUsers>("user", userSchema);
