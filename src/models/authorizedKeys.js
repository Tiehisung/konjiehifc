import mongoose, { Schema } from "mongoose";

const authorizedKeySchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    key: {
      type: String,
      required: [true, "Authorized key is required!"],
    },
  },
  { timestamps: true }
);

const AuthorizedKeyModel =
  mongoose.models.authorizedkeys ||
  mongoose.model("authorizedkeys", authorizedKeySchema);
export default AuthorizedKeyModel;
