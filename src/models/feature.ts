import mongoose, { Schema } from "mongoose";

export const featureSchema = new Schema({

  role: { type: String, unique: true, trim: true, lowercase: true, required: [true, 'Role name must be specified'] },
  data: {}
},
  { timestamps: true });


const FeatureModel =
  mongoose.models.features || mongoose.model("features", featureSchema);

export default FeatureModel;
