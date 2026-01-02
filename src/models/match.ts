import { EMatchStatus } from "@/types/match.interface";
import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    title: { type: String },
    opponent: { type: Schema.Types.ObjectId, ref: "teams", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: [...Object.values(EMatchStatus)],
      default: () => "UPCOMING",
    },
    goals: [{ type: Schema.Types.ObjectId, ref: "goals" }],
    squad: { type: Schema.Types.ObjectId, ref: "squad" },
   
    sponsor: [{ type: Schema.Types.ObjectId, ref: "sponsors" }],
    broadcaster: {},
    venue: { name: { type: String, default: () => 'Home Park' }, files: [{}] },
    isHome: Boolean,
    events: [{ description: String, title: String, minute: String, modeOfScore: String }],
  },
  { timestamps: true }
);

const MatchModel =
  mongoose.models.matches || mongoose.model("matches", matchSchema);

export default MatchModel;
