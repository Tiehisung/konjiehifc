import { IPostNews } from "@/app/admin/news/CreateNews";
import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import NewsModel from "@/models/news";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { logAction } from "../logs/helper";
import { IUser } from "@/types/user";
// export const revalidate = 0;

ConnectMongoDb();
export async function GET(request: NextRequest) {

  const session = await getServerSession(authOptions)

  console.log({ session })

  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);

  const search = searchParams.get("news_search") || "";
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

  const query = isAdmin ? {
    $or: [
      ...querySwitch
    ],
    "headline.text": regex,


  } : {
    $or: [
      ...querySwitch
    ],
    "headline.text": regex,
    "isPublished": true,
  }

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
    const { headline, details, reporter, type, }: IPostNews = await request.json();
    console.log(headline)

    const published = await NewsModel.create({
      headline,
      details,
      reporter, type: type ?? 'general'
    });
    const session = await getServerSession(authOptions)
    // log
    await logAction({
      title: "News Created",
      description: headline.text as string,
      category: "db",
      severity: "info",
      user: (session?.user as IUser) ?? reporter,
      meta: reporter

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
