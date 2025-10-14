
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      ok: true,
      message: 'Test complete!',

    })
  } catch (error) {

    return NextResponse.json({ ok: false, error }, { status: 500 })
  }
}
