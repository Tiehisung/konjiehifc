import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    opponent: { type: Schema.Types.ObjectId, ref: "teams", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    title: { type: String },
    status: {
      type: String,
      enum: ["LIVE", "UPCOMING", "COMPLETED"],
      default: () => "UPCOMING",
    },
    sponsor: { type: Schema.Types.ObjectId, ref: "sponsors" },
    score: {
      kfc: { type: Number, default: 0 },
      opponent: { type: Number, default: 0 },
    },
    goals: [{ type: Schema.Types.ObjectId, ref: "goals" }],
    opponentGoals: Number,
    broadcaster: {},
    venue: { name: String, files: [{}] },
    isHome: Boolean,
    events: [{ description: String, title: String, minute: String, modeOfScore: String }],
  },
  { timestamps: true }
);

const MatchModel =
  mongoose.models.matches || mongoose.model("matches", matchSchema);

export default MatchModel;
