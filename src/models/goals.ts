import mongoose, { Schema } from "mongoose";

export const goalSchema = new Schema(
  {
    opponent: { type: Schema.Types.ObjectId, ref: "teams", required: true },
    minute: String,
    scorer: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "players",
        required: true
      },
      name: String,
      avatar: String
    },
    assist: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "players",
      },
      name: String,
      avatar: String
    },
    type: String,
    description: String,
  },
  { timestamps: true }
);

const GoalModel = mongoose.models.goals || mongoose.model("goals", goalSchema);

export default GoalModel;

