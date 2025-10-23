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
        media: [{}], //IFileProps
      },
    ],
    type: {
      type: String
      , enum: ['general', 'squad', 'fixture',],
      default: 'general'
    },
    metaDetails: {}, //ISquad etc

    stats: {
      type: Schema.Types.Mixed,
      default: () => ({ isTrending: true, isLatest: true }),
    },

    isPublished: {
      type: Schema.Types.Boolean,
      default: false
    },
  },
  { timestamps: true }
);

const NewsModel = mongoose.models.news || mongoose.model("news", newsSchema);
export default NewsModel;

