import { NextRequest, NextResponse } from "next/server"
import { db } from '../../../lib/dbClient'
import { ParcelQueryTable, ParcelRate } from "@/lib/schema";
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
  let messages: string[] = [];
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
  // {
  //   company: "DHL Express",
  //   fromCountry: "Germany",
  //   maxWeight: 30,
  //   maxLength: 600,
  //   width: 600,
  //   height: 600
  // },
  // {
  //   company: "DHL Parcel",
  //   fromCountry: "Germany",
  //   maxWeight: 30,
  //   maxLength: 600,
  //   width: 0,
  //   height: 0
  // },
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

    if (fromCountry === carrier.fromCountry && weight <= carrier.maxWeight) {
      // console.log("Hello -1")
      try {
        const result = await db.select({
          fromCountry: ParcelQueryTable.fromCountry,
          toCountry: ParcelQueryTable.toCountry,
          carrier: ParcelQueryTable.carrier,
          ratePerItem: ParcelQueryTable.ratePerItem,
          ratePerKg: ParcelQueryTable.ratePerKg
        }).from(ParcelQueryTable)
          .where(
            and(
              eq(ParcelQueryTable.fromCountry, fromCountry),
              eq(ParcelQueryTable.toCountry, toCountry),
              eq(ParcelQueryTable.carrier, carrier.company),
              lt(ParcelQueryTable.weightFrom, weight),
              gte(ParcelQueryTable.weightTo, weight),
              gte(ParcelQueryTable.maxSumDim, length + width + height),
              gte(ParcelQueryTable.maxOneDim, length),
              gte(ParcelQueryTable.maxOneDim, width),
              gte(ParcelQueryTable.maxOneDim, height),
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
            console.log(carrier, calculatedRate);
          });
          // console.log("Hello0")
        };

      } catch (error) {
        console.error("Query Error: ", error);
      }
    }
  }

  return new NextResponse(JSON.stringify({ results: queryResults, messages: messages }), {
    status: queryResults.length > 0 ? 200 : 400
  });

}