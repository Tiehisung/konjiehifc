import { INewsProps, IPostNews } from "@/app/news/page";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { ConnectMongoDb } from "@/lib/dbconfig";
import NewsModel from "@/models/news";
import { IFileProps, IResultProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
// export const revalidate = 0;

ConnectMongoDb();
export async function GET() {
  const news = await NewsModel.find().sort({ createdAt: "desc" });
  return NextResponse.json(news);
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
