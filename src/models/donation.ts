import mongoose, { Schema } from "mongoose";

const donationSchema = new Schema(
  {
    item: {
      type: String,
      required: [true, "You must specify items for donation"],
      trim: true,
    },
    description: String,
    files: [{ type: Schema.Types.ObjectId, ref: "files" }],
    sponsor: {
      type: Schema.Types.ObjectId,
      ref: "sponsors",
      required: [true, "Sponsor required"],
    },
  },
  { timestamps: true }
);

const DonationModel =
  mongoose.models.donations || mongoose.model("donations", donationSchema);

export default DonationModel;
