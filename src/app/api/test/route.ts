import { ConnectMongoDb } from "@/lib/dbconfig";
 import { NextResponse } from "next/server";

ConnectMongoDb();
export async function GET() {
 

  return NextResponse.json({ message: "test" });
}
