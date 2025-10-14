
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      ok: true,
      message: 'Test complete!',

    })
  } catch (error: any) {

    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
