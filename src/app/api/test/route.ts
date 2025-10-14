 
import { NextResponse } from "next/server";

const sourceURI =
  'mongodb+srv://isoskode:isoskode-sms@cluster0.xkh1kir.mongodb.net/KONJIEHIFC?retryWrites=true&w=majority'

const targetURI = process.env.MDB_URI as string


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
