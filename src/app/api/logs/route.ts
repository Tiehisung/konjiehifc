import { NextRequest, NextResponse } from "next/server";

import LogModel from "@/models/logs";
import "@/models/user";
import { ConnectMongoDb } from "@/lib/dbconfig";


export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "20", 10);

  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";


  const skip = (page - 1) * limit;

  const regex = new RegExp(search, "i");
  const query = {
    $or: [
      { "title": regex },

      { "severity": regex },

      { "catgory": new RegExp(type, "i") },
    ],

  };
  const logs = await LogModel.find(query).populate('user').sort({ createdAt: 'desc' })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await LogModel.countDocuments(query);
  return NextResponse.json({
    success: true,
    data: logs, pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

// export async function POST(req: NextRequest) {
//   try {
//     const { title, description, category, severity, source, meta, url, user } = await req.json() as ILog;

//     const log = await LogModel.create({
//       title,
//       description,
//       category,
//       severity,
//       source,
//       meta,
//       url,
//       user
//     });
//     return NextResponse.json({
//       success: true,
//       message: "New log created",
//       data: log,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       message: getErrorMessage(error, "Failed to create user"),
//     });
//   }
// }



