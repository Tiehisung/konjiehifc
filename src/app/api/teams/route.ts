import "@/models/file";
import {
  IPostTeam,
  IUpdateTeam,
} from "@/app/admin/features/teams/CreateOrUpdateTeam";
import { apiConfig } from "@/lib/configs";
import { ConnectMongoDb } from "@/lib/dbconfig";
import TeamModel from "@/models/teams";
import { IFileProps, IResultProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb()

//Get teams
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1", 10);

    const limit = Number.parseInt(searchParams.get("limit") || "30", 10);
    const skip = (page - 1) * limit;

    const search = searchParams.get("team_search") || "";

    const regex = new RegExp(search, "i");

    const query = {
      $or: [
        { "name": regex },
        { "alias": regex },
        { community: regex },
      ],
    }

    const teams = await TeamModel.find(query).populate({ path: "logo" })
      .limit(limit)
      .skip(skip)
      .lean()
      .sort({
        createdAt: "desc",
      });

    const total = await TeamModel.countDocuments(query)
    return NextResponse.json({
      success: true,
      data: teams,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });


  } catch {

    return NextResponse.json({
      message: "Failed to retrieve teams",
      success: false,
      data: [],
    });
  }
}
//Post new team
export async function POST(request: NextRequest) {
  try {
    const team: IPostTeam = await request.json();

    
    //Save team to database
    const createdTeam = await TeamModel.create({
      ...team,
     
    });
    if (createdTeam) {
      return NextResponse.json({
        message: "Team created successfully",
        success: true,
        data: createdTeam,
      });
    }
    return NextResponse.json({
      message: "Team create failed",
      success: false,
      data: createdTeam,
    });
  } catch (error) {

    return NextResponse.json({
      message: "Failed to create team",
      success: false,
      data: error,
    });
  }
}

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
        { ...team, logo: uploadedImage.data?._id }
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



//Delete team
export async function DELETE(req: NextRequest) {
  try {
    const team: ITeamProps = await req.json();

    //Delete image from cloudinary
    await fetch(apiConfig.fileUpload, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([team.logo]),
    });

    //Delete team from database
    const deleted = await TeamModel.findByIdAndDelete(team._id);

    if (deleted) {
      return NextResponse.json({
        message: "Team deleted successfully",
        success: true,
      });
    }
    return NextResponse.json({
      message: "Failed to delete team",
      success: false,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to retrieve teams",
      success: false,
      data: error,
    });
  }
}
