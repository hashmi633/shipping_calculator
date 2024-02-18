import { NextRequest, NextResponse } from "next/server"
import { db } from '../../../lib/dbClient'
import { ParcelQueryTable, ParcelRate } from "@/lib/schema";
import { sql } from "@vercel/postgres";
import { and, eq, exists, gt, gte, lt, or } from "drizzle-orm";
import { boolean } from "drizzle-orm/mysql-core";


export const GET = async (request: NextRequest) => {
  let queryResults: string[] = [];

  try {
    const data = await db.select({
      toCountry: ParcelQueryTable.toCountry,
    }).from(ParcelQueryTable)


    // console.log("Bicho Gang-009");
    if (data.length > 0) {
      data.forEach((row: Partial<ParcelRate>) => {
        const toCountry = row.toCountry
        queryResults.push(`${toCountry}`)
      }
      )
    }
  } catch (error) {
    console.error("Query Error: ", error);
  }

  return new NextResponse(JSON.stringify({ results: queryResults }), {
    status: queryResults.length > 0 ? 200 : 400
  });

}