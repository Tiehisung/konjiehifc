import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    title: { type: String },
    opponent: { type: Schema.Types.ObjectId, ref: "teams", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["LIVE", "UPCOMING", "COMPLETED"],
      default: () => "UPCOMING",
    },
    goals: [{ type: Schema.Types.ObjectId, ref: "goals" }],
    squad: { type: Schema.Types.ObjectId, ref: "squad" },
    score: {
      kfc: { type: Number, default: 0 },
      opponent: { type: Number, default: 0 },
    },
    opponentGoals: { type: Number, default: 0 },
    sponsor: { type: Schema.Types.ObjectId, ref: "sponsors" },
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
