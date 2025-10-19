import { IPostNews } from "@/app/admin/news/CreateNews";
import { INewsProps, } from "@/app/news/page";
import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import NewsModel from "@/models/news";
import { IFileProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { fileUploader } from "../file/Uploader";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
// export const revalidate = 0;

ConnectMongoDb();
export async function GET(request: NextRequest) {

  const session = await getServerSession(authOptions)

  console.log({ session })

  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);

  const search = searchParams.get("search") || "";
  const isAdmin = searchParams.get("isAdmin") == 'true'
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
    "headline.text": regex,
    "isPublished": !isAdmin

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

    const { headlineText, headlineImage, details, }: IPostNews = await request.json();

    const headlineImageUploadResult = await fileUploader({
      name: headlineImage?.name ?? "headline",
      path: headlineImage?.path ?? "",
      type: headlineImage?.type ?? "image",
    });

    if (!headlineImageUploadResult.success)
      return NextResponse.json(headlineImageUploadResult);

    //Upload all files in details
    const shallowCopy: IPostNews["details"] = [...details];

    let modifiedDetails: INewsProps["details"] = [];

    for (let x = 0; x < shallowCopy.length; x++) {
      const detail = shallowCopy[x];
      if (detail?.media && detail.media.length) {
        const temp: IFileProps[] = [];
        for (const file of detail.media) {
          const uploaded = await fileUploader(file);
          temp.push(uploaded?.data as IFileProps);
        }
        modifiedDetails.push({ ...detail, media: temp });
      } else {
        modifiedDetails.push(detail);
      }
    }

    const published = await NewsModel.create({
      headline: {
        text: headlineText,
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
