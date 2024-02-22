import { pgTable, serial, varchar, boolean, integer, decimal, real } from 'drizzle-orm/pg-core'


export const shippingRates = pgTable("shipping_rates", {  // shipping_rates
  id: serial("id").primaryKey(),
  fromCountry: varchar("from_country", { length: 255 }),
  toCountry: varchar("to_country", { length: 255 }),
  carrier: varchar("carrier", { length: 255 }),
  weightFrom: real("weight_from"),
  weightTo: real("weight_to"),
  ratePerItem: real("rate_per_item").notNull(),
  ratePerKg: real("rate_per_kg").notNull(),
  shippingMethod: varchar("shipping_method"),
  estimatedDelivery: varchar("estimated_delivery")
});

export const boxes = pgTable("boxes", {
  id: serial("id").primaryKey(),
  maxSumDim: integer("max_sum_dim"),
  maxOneDim: integer("max_one_dim"),
  shippingRateId: integer("shipping_rate_id").notNull().references(() => shippingRates.id)
})

export type ParcelRate = typeof shippingRates.$inferSelect; // return type when queried
export type NewParcelRate = typeof shippingRates.$inferInsert; // insert type
