import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  const fromCountry = request.nextUrl.searchParams.get("fromCountry");
  request.nextUrl.searchParams.get("toCountry");
  request.nextUrl.searchParams.get("weight");
  request.nextUrl.searchParams.get("length");
  request.nextUrl.searchParams.get("width");
  request.nextUrl.searchParams.get("width");
  request.nextUrl.searchParams.get("height");

  return new NextResponse(`hello world ${fromCountry}`)
}


export const POST = async (request: NextRequest) => {
  const body = await request.json();
  
  return  NextResponse.json({
    data: body,
    message: "Facility Avalaible"
  });
}
