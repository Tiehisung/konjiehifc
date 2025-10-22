import mongoose, { Schema } from "mongoose";

const squadSchema = new Schema({
  opponent: {
    _id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    name: String,
    alias: String,
  },
  venue: {
    type: String,
    enum: ["Home", "Away"],
    required: true,
  },
  description: String,
  date: { type: String, required: true },
  time: { type: String, required: true },
  players: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Player" },
      name: { type: String, required: true },
      position: { type: String, required: true },
      avatar: String,
    },
  ],

  coach: {
    _id: { type: Schema.Types.ObjectId, ref: "Manager" },
    name: String,
    avatar: String,
  },
  assistant: {
    _id: { type: Schema.Types.ObjectId, ref: "Manager" },
    name: String,
    avatar: String,
  },

  isPlayed: { type: Boolean, default: false }
},
  { timestamps: true });


const SquadModel =
  mongoose.models.squad || mongoose.model("squad", squadSchema);

export default SquadModel;
