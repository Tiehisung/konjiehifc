import mongoose, { Schema } from "mongoose";

// mongoose.connect(process.env.MDB_URI!);
// mongoose.Promise = global.Promise;
const adminSchema = new Schema(
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
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    role: {
      type: String,
      default: "guest",
      enum: ["super_admin", "admin", 'guest', 'player',],
    },
    account: {
      type: String,
      default: "google",
      enum: ["google", "credentials",],
    },
  },
  { timestamps: true }
);

const AdminModel =
  mongoose.models.admins || mongoose.model("admins", adminSchema);

export default AdminModel;
