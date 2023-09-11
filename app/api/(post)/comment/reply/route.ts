import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
  try {

  } catch(error) {
    console.log(error)
    NextResponse.json('Bad Request', { status: 400 })
  }
}