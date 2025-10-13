import mongoose, { Schema } from "mongoose";

const goalSchema = new Schema(
  {
    team: { type: Schema.Types.ObjectId, ref: "teams", required: true },
    time: String,
    player: { type: Schema.Types.ObjectId, ref: "players", required: true },
    timestamp: Number,
  },
  { timestamps: true }
);

const GoalModel = mongoose.models.goals || mongoose.model("goals", goalSchema);

export default GoalModel;

 