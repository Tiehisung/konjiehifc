import { INewsProps, IPostNews } from "@/app/news/page";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { ConnectMongoDb } from "@/lib/dbconfig";
import NewsModel from "@/models/news";
import { IFileProps, IResultProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
// export const revalidate = 0;

ConnectMongoDb();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);

  const search = searchParams.get("search") || "";
  const trending = searchParams.get("trending") == "1";
  const latest = searchParams.get("latest") == '1' ? true : false;
  const hasVideo = searchParams.get("hasVideo") == '1' ? true : false;


  const skip = (page - 1) * limit;

  const regex = new RegExp(search, "i");

  let querySwitch: Record<string, unknown>[] = [];

  if (trending) {
    querySwitch = [
      { "stats.isTrending": true },
    ];
  }
  if (latest) {
    querySwitch = [
      { "stats.isLatest": true },
    ];
  }
  if (hasVideo) {
    querySwitch = [
      { "stats.hasVideo": true },
    ];
  }

  const query = {
    $or: [
      ...querySwitch
    ],

  };
  const news = await NewsModel.find(query).sort({ createdAt: "desc" }).skip(skip)
    .limit(limit)
    .lean();

  const total = await NewsModel.countDocuments(query)

  return NextResponse.json({
    success: true, data: news, pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const {
      headlineContent,
      details,
    }: // source,
      {
        headlineContent: IPostNews["headline"];
        details: IPostNews["details"];
      } = await request.json();
    //Upload headline file
    const uploadHeadlineImageResp = await fetch(apiConfig.fileUpload, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(headlineContent.image),
    });

    const headlineImageUploadResult: IResultProps<IFileProps> =
      await uploadHeadlineImageResp.json();

    if (!headlineImageUploadResult.success)
      return NextResponse.json(headlineImageUploadResult);

    //Upload all files in details
    const shallowCopy: IPostNews["details"] = [...details];
    let modifiedDetails: INewsProps["details"] = [];
    for (let x = 0; x <= details.length; x++) {
      const detail = details[x];
      if (detail?.media) {
        const temp: IFileProps[] = [];
        for (const file of detail?.media) {
          const uploadedMedia = await fetch(apiConfig.fileUpload, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(file),
          });
          const result: IResultProps<IFileProps> = await uploadedMedia.json();
          temp.push(result?.data as IFileProps);
        }

        modifiedDetails = shallowCopy.map((md, i) => {
          if (i != x) return md;
          return { ...md, media: temp };
        });
      }
    }
    const published = await NewsModel.create({
      headline: {
        text: headlineContent.text,
        image: headlineImageUploadResult.success
          ? headlineImageUploadResult.data
          : {},
      },
      details: modifiedDetails,
    });
    if (published)
      return NextResponse.json({
        message: "News published",
        success: true,
        data: published,
      });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error, "Failed to publish! "),
      success: false,
    });
  }
}
