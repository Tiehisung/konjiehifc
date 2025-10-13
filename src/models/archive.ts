import mongoose, { Schema } from "mongoose";

const archivedSchema = new Schema(
  {
    category: { type: String, required: true },
    data: Schema.Types.Array,
  },
  { timestamps: true }
);

const ArchivesModel =
  mongoose.models.archives || mongoose.model("archives", archivedSchema);

export default ArchivesModel;
