import { ILog } from "@/types";
import mongoose, { Schema } from "mongoose";

const logSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      trim: true,
    },

    description: String,

    // store the user email that triggered this log
    userEmail: {
      type: String,
      trim: true,
    },


    severity: {
      type: String,
      default: "info",
      enum: ["info", "warning", "error", "critical"],
    },

    category: {
      type: String,
      default: "api",
      enum: ["auth", "api", "db", "system", "ui", "other"],
    },

    source: {
      type: String,
      default: "user",
      enum: ["admin", "user",  "system",  "other"],
    },

    meta: { type: mongoose.Schema.Types.Mixed },

    url: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// use `ref`, not `model`
logSchema.virtual("user", {
  ref: "User",             // must match the model name of your users
  localField: "userEmail", // field in logs
  foreignField: "email",   // field in users
  justOne: true,
});

const LogModel =
  mongoose.models.logs || mongoose.model<ILog>("logs", logSchema);

export default LogModel;
