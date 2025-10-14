import { IUpdateTeam } from "@/app/admin/features/teams/CreateOrUpdateTeam";
import { apiConfig } from "@/lib/configs";
import { ConnectMongoDb } from "@/lib/dbconfig";
import TeamModel from "@/models/teams";
import { IFileProps, IResultProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();

//Update team
export async function PUT(request: NextRequest) {
  try {
    const team: IUpdateTeam = await request.json();

    if (team.logo) {
      const uploaded = await fetch(apiConfig.fileUpload, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team.logo),
      });

      const uploadedImage: IResultProps<IFileProps> = await uploaded.json();

      if (!uploadedImage.success) {
        return NextResponse.json({
          message: "Failed to upload image",
          success: false,
          data: uploadedImage.data,
        });
      }
      const updated = await TeamModel.updateOne(
        { _id: team._id },
        { ...team, logo: uploadedImage.data }
      );
      if (updated.acknowledged) {
        return NextResponse.json({
          message: "Team updated successfully",
          success: true,
        });
      }
    } else {
      const updated = await TeamModel.updateOne({ _id: team._id }, { ...team });
      if (updated.acknowledged) {
        return NextResponse.json({
          message: "Team updated successfully",
          success: true,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update team",
      success: false,
      data: error,
    });
  }
}

//Get teams
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  try {
    const team = await TeamModel.findById((await params).teamId);
    return NextResponse.json({
      message: "File retrieved successfully",
      success: true,
      data: team,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to retrieve team",
      success: false,
      data: error,
    });
  }
}
