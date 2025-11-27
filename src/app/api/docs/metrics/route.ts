import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getDocumentMetrics } from "../docsMetrics";

ConnectMongoDb();

export async function GET(_: NextRequest) {
    const metrics = await getDocumentMetrics()
    return NextResponse.json({
        success: true,
        data: metrics
    });
}