import { NextRequest, NextResponse } from "next/server"
import { db, ParcelQueryTable } from '../../../lib/drizzle'
import { sql } from "@vercel/postgres";


export const GET = async (request: NextRequest) => {

  const fromCountry = request.nextUrl.searchParams.get("fromCountry");
  const toCountry = request.nextUrl.searchParams.get("toCountry");
  const weight = parseFloat(request.nextUrl.searchParams.get("weight") || "0");
  const length = parseFloat(request.nextUrl.searchParams.get("length") || '0');
  const width = parseFloat(request.nextUrl.searchParams.get("width") || "0");
  const height = parseFloat(request.nextUrl.searchParams.get("height") || "0");

  let messages: string[] = [];
  let queryResults: string[] = [];

  if (!fromCountry || !toCountry || isNaN(weight) || weight < 0) {
    messages.push("From Country, To Country, and Weight fields are mandatory to fill")
  } else {

    interface QueryResultRow {
      rate_per_item: number;
    }

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
      width: 0,
      height: 0
    },
    {
      company: "DHL Express",
      fromCountry: "Germany",
      maxWeight: 30,
      maxLength: 600,
      width: 0,
      height: 0
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
      width: 0,
      height: 0
    }
    ];

    for (let carrier of carriers) {

      if (fromCountry === carrier.fromCountry && weight <= carrier.maxWeight && (length || !carrier.maxLength <= carrier.maxLength)) {
        // let query = sql`
        //       SELECT rate_per_item
        //       FROM ParcelQuery
        //       WHERE from_country = ${fromCountry}
        //       AND to_country = ${toCountry}
        //       AND carrier = ${carrier.company}
        //       AND length <= ${length}
        //       AND width = ${width}
        //       AND height = ${height}
        //       AND weight_from > ${weight}
        //       AND weight_to <= ${weight}`;

        // try {
        //   const result = await (db.query as any)(query);
        //   if (result.rows.length > 0) {
        //     result.rows.forEach((row: QueryResultRow) => {
        //       queryResults.push(`${carrier.company} offers a rate of ${row.rate_per_item} from ${fromCountry} to ${toCountry}`)
        //     });
        //   };
        // } catch (error) {
        //   console.error("Query Error: ", error);
        //   messages.push(`Error querying rates for ${carrier.company}.`)
        // }
        queryResults.push(`${carrier.company} can provide service in ${toCountry}.`) // only to check client response

      } else if (fromCountry === carrier.fromCountry) {
        queryResults.push(`Service by ${carrier.company} in ${fromCountry} is limited to packages under ${carrier.maxWeight}kg.`) // only to check client response
        // messages.push(`Service by ${carrier.company} in ${fromCountry} is limited to packages under ${carrier.maxWeight}kg`);
      } else {
        // messages.push(`Service is not provided by ${carrier.company} in ${fromCountry}`);
        queryResults.push(`Service is not provided by ${carrier.company} in ${fromCountry}.`); // only to check client response
      }
    }
  }

  return new NextResponse(JSON.stringify({ results: queryResults, messages: messages }), {
    status: queryResults.length > 0 ? 200 : 400
  });

}