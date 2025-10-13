import mongoose, { Schema } from "mongoose";

const managerSchema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      trim: true,
      message: "Phone number required",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      message: "Email required",
      match: [/\S+@\S+\.\S+/, "Email must be valid"],
    },
    dob: { type: String, required: true },
    dateSigned: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
    startDate: { type: String, default: () => new Date().toISOString() },
    endDate: { type: String },
    avatar: { type: Schema.Types.Mixed, required: true }, //IFileProps
    galleries: [{ type: Schema.Types.ObjectId }],
    card: { type: String, default: () => "" },
    medicals: { type: Schema.Types.Array, default: () => [] },
    role: {
      type: String,
      required: true,
      enum: [
        "Technical manager",
        "Coach",
        "Assistant coach",
        "Goalkeeper coach",
        "Fitness coach",
        "Analyst",
      ],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ManagerModel =
  mongoose.models.managers || mongoose.model("managers", managerSchema);

export default ManagerModel;
