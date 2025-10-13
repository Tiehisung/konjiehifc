import { apiConfig } from "@/lib/configs";
import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { IFileProps, IResultProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function POST(request: NextRequest) {
  const formData = await request.json();
  console.log("formData", formData);
  const { avatar,  } = formData;
  if (typeof avatar === "string") {
    //Upload image to cloudinary

    const uploaded = await fetch(apiConfig.fileUpload, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.firstName,
        path: avatar,
        type: "image",
        description: "Player avatar",
      }),
    });

    const uploadedImage: IResultProps<IFileProps> = await uploaded.json();
    if (!uploadedImage.success) {
      return NextResponse.json({
        message: "Failed to upload image",
        success: false,
        data: uploadedImage,
      });
    }
    const saved = await PlayerModel.create({
      ...formData,
      avatar: uploadedImage.data ? uploadedImage.data._id : null,
    });
    if (saved) return NextResponse.json({ message: "Success", success: true });
    return NextResponse.json({ message: "Success", success: true });
  } else {
    const saved = await PlayerModel.create({ ...formData });
    if (saved) return NextResponse.json({ message: "Success", success: true });
    return NextResponse.json({ message: "Success", success: true });
  }
}
