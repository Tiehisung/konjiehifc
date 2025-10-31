import mongoose, { Schema } from "mongoose";

export const mvpSchema = new Schema(
  {

    player: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "players",
        required: true
      },
      name: String,
      avatar: String,
      number: String
    },
    match: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "matches",
        required: true
      },
      name: String,
    },

    description: String,

  },
  { timestamps: true }
);

const MvPModel = mongoose.models.mvps || mongoose.model("mvps", mvpSchema);

export default MvPModel;

