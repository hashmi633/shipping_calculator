import { NextRequest, NextResponse } from "next/server"

export const GET = () => {
  return new NextResponse("hello world")
}


export const POST = async (request: NextRequest) => {
  const body = await request.json();
  
  return  NextResponse.json({
    data: body,
    message: "Facility Avaliable"
  });
}