import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true ,unique:true},
    alias: String,
    community: { type: String },
    logo: { type: Schema.Types.ObjectId, ref: "files" },
    isHome: Boolean,
    currentPlayers: [{ type: Schema.Types.ObjectId, ref: "players" }],
  },
  { timestamps: true }
);

const TeamModel =
  mongoose.models.teams || mongoose.model("teams", teamSchema);

export default TeamModel;

 
