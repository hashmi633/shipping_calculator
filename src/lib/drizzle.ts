import { sql } from '@vercel/postgres'
import { pgTable, serial, varchar, boolean, integer } from 'drizzle-orm/pg-core'

import { drizzle } from 'drizzle-orm/vercel-postgres'



export const ParcelQueryTable = pgTable("ParcelQuery", {
  id: serial("id").primaryKey(),
  fromCountry: varchar("from_country", { length: 255 }),
  toCountry: varchar("to_country", { length: 255 }),
  carrier: varchar("carrier", { length: 255 }),
  weightFrom: integer("weight_from"),
  weightTo: integer("weight_to"),
  length: integer("length"),
  width: integer("width"),
  height: integer("height"),
  ratePerItem: integer("rate_per_item"),
  ratePerKg: integer("rate_per_kg"), 
});

export const db = drizzle(sql)


// export const parcelRatesTable = pgTable("ParcelRates", {
//   id: serial("id").primaryKey(),
//   countryName: varchar("CountryName", { length: 255 }),
//   companyName: varchar("CompanyName", { length: 255 }),
//   rateHalfkg: integer("RateHalfKG"),
//   rate1kg: integer("Rate1KG"),
//   rate1Halfkg: integer("Rate1HalfKG"),
//   rate2kg: integer("Rate2KG"),
//   rate5kg: integer("Rate5KG"),
//   rate15kg: integer("Rate15KG"),
//   rate32kg: integer("Rate32KG"),
// });





// export const countryServedTable = pgTable("countryServed", {
//   id: serial("id").primaryKey(),
//   name: text("name"),
//   status: boolean("status").notNull().default(true)
// })

// export const dimensionWeightTable = pgTable("dimension&Weight", {
//   id: serial("id").primaryKey(),
  
//   weight: integer('weight').notNull(),
//   status: boolean("status").notNull().default(true)
// })

// export const generalParcelRatesTable = pgTable("generalParcelRates", { // for first 3 companies
//   id: serial("id").primaryKey(),
//   countryName: varchar("CountryName", { length: 255 }),
//   companyName: varchar("CompanyName", { length: 255 }),
//   pricePerItem: integer("PricePerItem"),
//   pricePerKg: integer("PricePerKg")
// });



// export const dhlCountriesZonesTable = pgTable("CountriesZones", {
//   id: serial("id").primaryKey(),
//   countryCode: text("CountryCode"), // 2 or 3-letter country code (e.g., "US", "GB", "DE")
//   countryName: text("CountryName"),
//   zoneName: text("ZoneName") // Directly include the zone name here
// });

// export const expressRatesTable = pgTable("ExpressRates", {
//   id: serial("id").primaryKey(),
//   zoneId: serial("ZoneId"), // zone id in dhlCountriesZonesTable - foreign key
//   weightBracket: text("WeightBracket"), // e.g., "0-2kg", "3-5kg", etc.
//   rate: integer("Rate")
// });
