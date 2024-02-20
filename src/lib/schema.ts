import { pgTable, serial, varchar, boolean, integer, decimal, real } from 'drizzle-orm/pg-core'


export const ParcelQueryTable = pgTable("ParcelQuery", {
  id: serial("id").primaryKey(),
  fromCountry: varchar("from_country", { length: 255 }),
  toCountry: varchar("to_country", { length: 255 }),
  carrier: varchar("carrier", { length: 255 }),
  weightFrom: real("weight_from"),
  weightTo: real("weight_to"),
  maxSumDim: integer("max_sum_dim"),
  maxOneDim: integer("max_one_dim"),
  ratePerItem: real("rate_per_item").notNull(),
  ratePerKg: real("rate_per_kg").notNull(),
  shippingMethod: varchar("shipping_method"),
  estimatedDelivery: varchar("estimated_delivery")
});

export type ParcelRate = typeof ParcelQueryTable.$inferSelect; // return type when queried
export type NewParcelRate = typeof ParcelQueryTable.$inferInsert; // insert type
