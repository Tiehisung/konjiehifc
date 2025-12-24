import { EUserAccount, EUserRole } from "@/types/user";
import mongoose, { Schema } from "mongoose";

// mongoose.connect(process.env.MDB_URI!);
// mongoose.Promise = global.Promise;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      trim: true,
    },
    image: String,
    dateEngaged: { type: String, default: () => new Date().toISOString() },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already taken"],
      trim: true,
      lowercase: true,
    },
    password: { type: String, },
    isActive: { type: Boolean, default: true },
    role: {
      type: String,
      default: "guest",
      enum: [...Object.values(EUserRole)],
    },
    account: {
      type: String,
      default: "google",
      enum: [...Object.values(EUserAccount)],
    },
    lastLoginAccount: {
      type: String,
      enum: [...Object.values(EUserAccount)],
    },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
