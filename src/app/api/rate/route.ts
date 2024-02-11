import { NextRequest, NextResponse } from "next/server"
import { db } from '../../../lib/dbClient'
import { ParcelQueryTable, ParcelRate } from "@/lib/schema";
import { sql } from "@vercel/postgres";
import { and, eq, gt, gte, lt } from "drizzle-orm";


export const GET = async (request: NextRequest) => {

  const fromCountry = request.nextUrl.searchParams.get("fromCountry");
  const toCountry = request.nextUrl.searchParams.get("toCountry");
  const weight = parseFloat(request.nextUrl.searchParams.get("weight") || "0");
  const length = parseFloat(request.nextUrl.searchParams.get("length") || '0');
  const width = parseFloat(request.nextUrl.searchParams.get("width") || "0");
  const height = parseFloat(request.nextUrl.searchParams.get("height") || "0");
  console.log(weight);

  let messages: string[] = [];
  let queryResults: string[] = [];

  interface Carriers {
    company: string,
    fromCountry: string,
    maxWeight: number,
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
    fromCountry: "Germany",
    maxWeight: 30,
    maxLength: 600,
    width: 600,
    height: 600
  },
  {
    company: "DHL Parcel",
    fromCountry: "Germany",
    maxWeight: 30,
    maxLength: 600,
    width: 0,
    height: 0
  },
  {
    company: "Royal Mail",
    fromCountry: "United Kingdom",
    maxWeight: 2,
    maxLength: 600,
    width: 0,
    height: 0
  },
  {
    company: "Asendia",
    fromCountry: "France",
    maxWeight: 2,
    maxLength: 600,
    width: 600,
    height: 600
  }
  ];

  if (!fromCountry || !toCountry || isNaN(weight) || weight <= 0) {
    queryResults.push("From Country, To Country, and Weight fields are mandatory to fill")
  } else {

    for (let carrier of carriers) {


      // if ((length > carrier.maxLength && width > carrier.width && height > carrier.height) ||
      //   ((length > carrier.maxLength && width > carrier.width)
      //     || (width > carrier.width && height > carrier.height)
      //     || (height > carrier.height && length > carrier.maxLength))
      // ) {
      //   queryResults.push(`Only one side of the parcel will be greater than 600`)
      // }


      if (fromCountry === carrier.fromCountry && weight <= carrier.maxWeight && (length || !carrier.maxLength <= carrier.maxLength)) {
        // let query = sql`
        //       SELECT rate_per_item
        //       FROM "ParcelQuery"
        //       WHERE from_country = ${fromCountry}
        //       AND to_country = ${toCountry}
        //       AND carrier = ${carrier.company}
        //       AND length <= ${length}
        //       AND width = ${width}
        //       AND height = ${height}
        //       AND weight_from <= ${weight}
        //       AND weight_to > ${weight}`;

        try {
          // const result = await db.query(query);
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
                // gt(ParcelQueryTable.maxSumDim, length + width + height),
                // gt(ParcelQueryTable.maxOneDim, length),
                // gt(ParcelQueryTable.maxOneDim, width),
                // gt(ParcelQueryTable.maxOneDim, height)
              )
            );

          if (result.length > 0) {
            result.forEach((row: Partial<ParcelRate>) => {
              const ratePerItem = row.ratePerItem ? row.ratePerItem : 0;
              const ratePerKg = row.ratePerKg ? row.ratePerKg : 0;
              const calculatedRate = ratePerItem + (ratePerKg * (weight * 1000))
              queryResults.push(`${carrier.company} offers a rate of EUR${calculatedRate} from ${fromCountry} to ${toCountry}`)
            });
          };
        } catch (error) {
          console.error("Query Error: ", error);
          messages.push(`Error querying rates for ${carrier.company}.`)
        }

      } else if (fromCountry === carrier.fromCountry) {
        queryResults.push(`Service by ${carrier.company} in ${fromCountry} is limited to packages under ${carrier.maxWeight}kg.`) // only to check client response
        messages.push(`Service by ${carrier.company} in ${fromCountry} is limited to packages under ${carrier.maxWeight}kg`);
      } else {
        messages.push(`Service is not provided by ${carrier.company} in ${fromCountry}`);
        queryResults.push(`Service is not provided by ${carrier.company} in ${fromCountry}.`); // only to check client response
      }
    }
  }

  return new NextResponse(JSON.stringify({ results: queryResults, messages: messages }), {
    status: queryResults.length > 0 ? 200 : 400
  });

}