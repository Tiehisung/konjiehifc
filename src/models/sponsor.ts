import mongoose, { Schema } from "mongoose";

const sponsorSchema = new Schema(
  {
    ownerName: {
      type: String,
      unique: [true, "Name already exists"],
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
      unique: [true, "Business name already exists"],
      trim: true,
      min: [2, "Minimun length is 2"],
      max: [20, "Maximum length is 20"],
    },
    businessDescription: { type: String },
    phone: String,
    logo: String,
    donations: [
      {
        type: Schema.Types.ObjectId,
        ref: "donations",
      },
    ],
    badges: { type: Number, default: () => 0 },
  },
  { timestamps: true }
);

const SponsorModel =
  mongoose.models.sponsors || mongoose.model("sponsors", sponsorSchema);

export default SponsorModel;
