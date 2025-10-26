
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    secure_url: { type: String },
    resource_type: { type: String, },
    bytes: { type: Number },
    public_id: { type: String },
    type: { type: String },
    tags: { type: [String], default: [] },//Can be used to store any tags associated with the file eg.'objectIds', 'profile-picture', 'gallery-image','video', etc.
  },
  { timestamps: true }
);

const FileModel = mongoose.models.files || mongoose.model("files", fileSchema);

export default FileModel;

