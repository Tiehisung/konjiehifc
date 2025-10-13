import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    opponent: { type: Schema.Types.ObjectId, ref: "teams", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    title: { type: String },
    status: {
      type: String,
      enum: ["FT", "HT", "LIVE", "SCHEDULED", "POSTPONED", "CANCELED"],
      default: () => "SCHEDULED",
    },
    sponsor: { type: Schema.Types.ObjectId, ref: "sponsors" },
    score: {
      kfc: { type: Number, default: 0 },
      opponent: { type: Number, default: 0 },
    },
    goals: [{ type: Schema.Types.ObjectId, ref: "goals" }],
    broadcaster: {},
    venue: { name: String, files: [{}] },
    isHome: Boolean,
    events: [{ description: String, time: String }],
  },
  { timestamps: true }
);

const MatchModel =
  mongoose.models.matches || mongoose.model("matches", matchSchema);

export default MatchModel;
