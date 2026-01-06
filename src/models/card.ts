import mongoose, { Schema } from "mongoose";

export const cardSchema = new Schema(
  {

    minute: String,
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

    type: { type: String, enum: ['yellow', 'red'], default: 'yellow' },
    description: String,

  },
  { timestamps: true }
);

const CardModel = mongoose.models.cards || mongoose.model("cards", cardSchema);

export default CardModel;

export type IPostCard = mongoose.InferSchemaType<typeof cardSchema>;