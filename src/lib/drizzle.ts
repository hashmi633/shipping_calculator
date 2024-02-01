import { sql } from '@vercel/postgres'
import { pgTable, text, serial, varchar, boolean, integer } from 'drizzle-orm/pg-core'

import { drizzle } from 'drizzle-orm/vercel-postgres'

// export const countryServedTable = pgTable("countryServed", {
//   id: serial("id").primaryKey(),
//   name: text("name"),
//   status: boolean("status").notNull().default(true)
// })

// export const dimensionWeightTable = pgTable("dimension&Weight", {
//   id: serial("id").primaryKey(),
//   length: integer("length"),
//   width: integer("width"),
//   height: integer("height"),
//   weight: integer('weight').notNull(),
//   status: boolean("status").notNull().default(true)
// })

export const generalParcelRatesTable = pgTable("generalParcelRates", {
  id: serial("id").primaryKey(),
  countryName: varchar("CountryName", { length: 255 }),
  companyName: varchar("CompanyName", { length: 255 }),
  pricePerItem: integer("PricePerItem"),
  pricePerKg: integer("PricePerKg")
});


export const dhlParcelRatesTable = pgTable("dhlParcelRates", {
  id: serial("id").primaryKey(),
  countryName: varchar("CountryName", { length: 255 }),
  eur2kg: integer("2KG"),
  eur5kg: integer("5KG"),
  eur15kg: integer("15KG"),
  eur32kg: integer("32KG")
});

export const dhlCountriesZonesTable = pgTable("CountriesZones", {
  id: serial("id").primaryKey(),
  countryCode: text("CountryCode"), // 2 or 3-letter country code (e.g., "US", "GB", "DE")
  countryName: text("CountryName"),
  zoneName: text("ZoneName") // Directly include the zone name here
});

export const expressRatesTable = pgTable("ExpressRates", {
  id: serial("id").primaryKey(),
  zoneId: serial("ZoneId"), // zone id in dhlCountriesZonesTable - foreign key
  weightBracket: text("WeightBracket"), // e.g., "0-2kg", "3-5kg", etc.
  rate: integer("Rate")
});

export const db = drizzle(sql)