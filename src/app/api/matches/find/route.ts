import { IGetMatchesProps } from "@/app/admin/matches/page";
import { deleteEmptyKeys, getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/matches";
import { NextRequest, NextResponse } from "next/server";
import "@/models/teams";
import "@/models/file";
import "@/models/goals";
import "@/models/player";

ConnectMongoDb();
// export const revalidate = 0;
// export const dynamic = "force-dynamic";

//Post new fixture
export async function POST(request: NextRequest) {
  try {
    const formdata: IGetMatchesProps = await request.json();
    const sort = formdata.sort || "desc";
    console.log("formdata", formdata);

    const filters = {
      status: formdata.status,
      isHome: formdata.isHome,
    };

    deleteEmptyKeys(filters);

    const fixtures = await MatchModel.find(filters)
      .populate({ path: "opponent", populate: { path: "logo" } })
      .populate({ path: "goals", populate: { path: "players" } })
      .sort({
        createdAt: sort,
      });
    return NextResponse.json(fixtures);
  } catch (error) {
    console.log(getErrorMessage(error).length);
    console.log({error})
    return NextResponse.json(null);
  }
}
