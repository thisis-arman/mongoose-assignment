import { Schema, model } from "mongoose";
import { UserModel, TUsers } from "./user.interface";
import { string } from "zod";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUsers, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, "UserId is required, and it must be a number"],
  },
  password: {
    type: String,
    unique: true,
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const saltRounds = 10;
userSchema.pre("save", async function(next) {
  const user = this;
  // hashing password
  user.password = await bcrypt.hash(user.password, Number(saltRounds));
  next();
});

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
// // delete password field when response
// userSchema.methods.toJSON = function() {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };
//
// userSchema.pre("save", async function(next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this.password;
//   console.log("from pre this", this);
//   user.password = await bcrypt.hash(user.password, saltRounds);
//   next();
// });

// userSchema.post()

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
