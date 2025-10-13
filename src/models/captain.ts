import mongoose, { Schema } from "mongoose";

const captainSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["captain", "vice"] },
    startDate: { type: String, default: () => new Date().toISOString() },
    endDate: { type: String },
    player: { type: Schema.Types.ObjectId, ref: "players" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CaptaincyModel =
  mongoose.models.captains || mongoose.model("captains", captainSchema);

export default CaptaincyModel;
