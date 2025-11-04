import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      message: "First name required",
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      message: "Last name required",
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      message: "Phone number required",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      message: "Email required",
      match: [/\S+@\S+\.\S+/, "Email must be valid"],
    },
    height: { type: Number },
    captaincy: { type: String },
    dob: { type: String, required: true },
    about: { type: String, },
    description: { type: String, },
    history: { type: String, },
    dateSigned: { type: String, required: true },
    avatar: String,
    featureImage: String,
    manager: {
      fullname: String,
      phone: String,
      dob: String,
      email: { type: String, match: [/\S+@\S+\.\S+/, "Email must be valid"] },
    },
    performance: { type: Schema.Types.Array, default: () => [] },

    galleries: [{ type: Schema.Types.ObjectId, ref: "galleries", default: [] }],
    cards: [{ type: Schema.Types.ObjectId, ref: "cards", default: [] }],
    injuries: [{ type: Schema.Types.ObjectId, ref: "injuries", default: [] }],
    goals: [{ type: Schema.Types.ObjectId, ref: "goals", default: [] }],
    assists: [{ type: Schema.Types.ObjectId, ref: "goals", default: [] }],
    ratings: [{ match: { type: Schema.Types.ObjectId, ref: "matches" }, rating: Number, default: [] }],
    matches: [{ type: Schema.Types.ObjectId, ref: "matches", default: [] }],
    mvp: [{ type: Schema.Types.ObjectId, ref: "mvps", default: [] }],

    issues: [{ type: String, default: () => [] }],
    isActive: { type: Schema.Types.Boolean, default: () => true },
    isFit: { type: Boolean, default: () => true },
    playRole: { type: String }, //revisit
    number: { type: String, required: true, unique: true },
    position: {
      type: String,

    },
    training: { type: Schema.Types.Mixed, default: () => ({ team: "A" }) },
  },
  { timestamps: true }
);

const PlayerModel =
  mongoose.models.players || mongoose.model("players", playerSchema);

export default PlayerModel;
