import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
  {
    opponent: { type: Schema.Types.ObjectId, ref: "teams", required: true }
    ,
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
        required: true
      },
      name: String,
      avatar: String
    },
    type: String,
    description: String,
  },
  { timestamps: true }
);

const CardModel = mongoose.models.cards || mongoose.model("cards", cardSchema);

export default CardModel;

