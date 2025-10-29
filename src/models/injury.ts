import mongoose, { Schema } from "mongoose";

export const injurySchema = new Schema(
  {
    match: { type: Schema.Types.ObjectId, ref: "match", required: true },
    minute: String,
    player: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "players",
        required: true
      },
      name: String,
      avatar: String,
      number: Number
    },
    severity: { type: String, enum: ["minor", "moderate", "severe"], default: 'minor' },
  },
  { timestamps: true }
);

const InjuryModel = mongoose.models.injuries || mongoose.model("injuries", injurySchema);

export default InjuryModel;

