import "@/models/file";
import "@/models/galleries";

import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, getInitials, removeEmptyKeys, slugify } from "@/lib";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import { EUserRole } from "@/types/user";
import { formatDate } from "@/lib/timeAndDate";
import { IPostPlayer } from "@/types/player.interface";

ConnectMongoDb();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  const isActive = searchParams.get("isCurrentPlayer") == "0" ? false : true

  const limit = Number.parseInt(searchParams.get("limit") || "30", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("player_search") || "";

  const status = searchParams.get("status")

  const regex = new RegExp(search, "i");

  const query = {
    $or: [
      { "firstName": regex },
      { "lastName": regex },
      { "position": regex },
      { "jersey": regex },
      { "dob": regex },
      { "email": regex },
      { "status": regex },
    ],
    isCurrentPlayer: isActive,
    status
  }
  const cleaned = removeEmptyKeys(query)

  const players = await PlayerModel.find(cleaned)
    .populate({ path: "galleries", populate: { path: 'files' } }).skip(skip)
    .limit(limit)
    .lean();

  const total = await PlayerModel.countDocuments(cleaned)
  return NextResponse.json({
    success: true,
    data: players,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const pf = (await request.json()) as IPostPlayer;
  try {
    //Ensure unique code ----------------------------------------

    let playerCode = generatePlayerID(pf.firstName, pf.lastName, pf.dob)

    const existingPlayerByCode = await PlayerModel.findOne({ code: playerCode });

    if (existingPlayerByCode) {
      playerCode = getInitials([pf.firstName, pf.lastName], 2) + (new Date()).getMilliseconds()
    }

    const slug = slugify(`${pf.firstName}-${pf.lastName}-${playerCode}`,)
    //--------------------------------------------------------------------------------
    await PlayerModel.create({ ...pf, slug, code: playerCode });
    // Create User
    if (pf.email) {
      const existingUser = await UserModel.findOne({ email: pf.email });

      if (!existingUser) {
        const password = await bcrypt.hash(pf.firstName.toLowerCase(), 10);

        await UserModel.create({
          email: pf.email,
          name: `${pf.firstName} ${pf.lastName}`,
          image: pf.avatar,
          lastLoginAccount: 'credentials',
          signupMode: 'credentials',
          password,
          role: EUserRole.PLAYER
        });
      }
    }
    return NextResponse.json({ message: "Player Added", success: true });
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error), success: false, data: error });
  }
}

export const generatePlayerID = (firstName: string, lastName: string, dob: string | Date, format: 'ymd' | 'ydm' | 'dmy' | 'dym' | 'mdy' | 'myd' = 'dmy') => {
  const initials = getInitials([firstName, lastName], 2)
  const date = formatDate(dob, 'dd/mm/yyyy')
  const dmy = date.split('/').reverse()

  const codes = {
    dmy: dmy[2] + dmy[1] + dmy[0].substring(2),
    dym: dmy[2] + dmy[0].substring(2) + dmy[1],
    mdy: dmy[2] + dmy[1] + dmy[0].substring(2),
    myd: dmy[2] + dmy[0].substring(2) + dmy[1],
    ydm: dmy[0].substring(2) + dmy[2] + dmy[1],
    ymd: dmy[0].substring(2) + dmy[1] + dmy[2],
  }

  return initials.toUpperCase() + codes[format]
}
