import mongoose, { Schema } from "mongoose";
const newsSchema = new Schema(
  {
    headline: {
      text: { type: String, required: [true, "Headline text required"] },
      image: {
        type: Schema.Types.Mixed,
        required: [true, "Wall image for headline required"],
      },
    },
    source: {
      type: Schema.Types.Mixed,
      default: "konjiehifc.vercel.app",
    },
    details: [
      {
        text: String,
        isText: Boolean,
        media: [{}], //IFileProps
      },
    ],

    stats: {
      type: Schema.Types.Mixed,
      default: () => ({ isTrending: true, isLatest: true }), //many more...
    },
  },
  { timestamps: true }
);

const NewsModel = mongoose.models.news || mongoose.model("news", newsSchema);
export default NewsModel;

 