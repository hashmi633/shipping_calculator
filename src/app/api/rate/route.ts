import { NextRequest, NextResponse } from "next/server"
import { db } from '../../../lib/dbClient'
import { shippingRates, boxes, ParcelRate } from "@/lib/schema";
import { sql } from "@vercel/postgres";
import { and, eq, gt, gte, lt, or } from "drizzle-orm";
import { boolean } from "drizzle-orm/mysql-core";


export const GET = async (request: NextRequest) => {

  const fromCountry = (request.nextUrl.searchParams.get("originCountry") || '');
  const toCountry = request.nextUrl.searchParams.get("destCountry") || '';
  const weight = parseFloat(request.nextUrl.searchParams.get("weight") || "0") || 0;
  const length = parseFloat(request.nextUrl.searchParams.get("length") || '0') || 0;
  const width = parseFloat(request.nextUrl.searchParams.get("width") || "0") || 0;
  const height = parseFloat(request.nextUrl.searchParams.get("height") || "0") || 0;

  interface QueryResult {
    carrier: string | null | undefined;
    rate: string;
  }
  let messages: string = '';
  let condition: boolean = false;
  let queryResults: QueryResult[] = [];

  interface Carriers {
    company: string,
    fromCountry: string,
    maxWeight: any,
    maxLength?: any,
    width?: any,
    height?: any
  }

  let carriers: Carriers[] = [{
    company: "PostNL",
    fromCountry: "Netherlands",
    maxWeight: 2,
    maxLength: 600,
    width: 600,
    height: 600
  },
  {
    company: "DHL Express",
    fromCountry: "Netherlands",
    maxWeight: 2,
    maxLength: 600,
    width: 600,
    height: 600
  },
  {
    company: "DHL Parcel",
    fromCountry: "Netherlands",
    maxWeight: 32,
    maxLength: 600,
    width: 0,
    height: 0
  },
  {
    company: "Royal Mail",
    fromCountry: "Netherlands",
    maxWeight: 2,
    maxLength: 600,
    width: 0,
    height: 0
  },
  {
    company: "Asendia",
    fromCountry: "Netherlands",
    maxWeight: 2,
    maxLength: 600,
    width: 600,
    height: 600
  }
  ];



  for (let carrier of carriers) {

    // if (fromCountry === carrier.fromCountry
    //   //  && weight <= carrier.maxWeight
    // ) {
    // console.log("Hello -1")
    try {
      const result = await db.select({
        fromCountry: shippingRates.fromCountry,
        toCountry: shippingRates.toCountry,
        carrier: shippingRates.carrier,
        ratePerItem: shippingRates.ratePerItem,
        ratePerKg: shippingRates.ratePerKg
      }).from(shippingRates)
        .where(
          and(
            eq(shippingRates.fromCountry, fromCountry),
            eq(shippingRates.toCountry, toCountry),
            eq(shippingRates.carrier, carrier.company),
            lt(shippingRates.weightFrom, weight),
            gte(shippingRates.weightTo, weight),
          )
        ).leftJoin(boxes,
          (
            gte(boxes.maxSumDim, length + width + height),
            gte(boxes.maxOneDim, length),
            gte(boxes.maxOneDim, width),
            gte(boxes.maxOneDim, height),
            eq(shippingRates.id, boxes.id)
          )
        );
      if (result.length > 0) {

        result.forEach((row: Partial<ParcelRate>) => {
          const ratePerItem = row.ratePerItem ? row.ratePerItem : 0;
          const ratePerKg = row.ratePerKg ? row.ratePerKg : 0;
          const calculatedRate = (ratePerItem + (ratePerKg * weight))
            .toFixed(2);
          const carrier = row.carrier
          queryResults.push({ carrier: carrier, rate: `€${calculatedRate}` })
          // console.log(carrier, calculatedRate);
        });
        messages = '';
      }

    } catch (error) {
      console.error("Query Error: ", error);
    }
    // }
  }
  if (queryResults.length === 0) {
    messages = "No Result Found"
    condition = true;

  } else {
    messages = '';
  }
  // console.log(messages);

  return new NextResponse(JSON.stringify({ results: queryResults, messages: messages }), {
    status: (queryResults.length > 0 || condition == true) ? 200 : 400
  });

}