import { sql } from '@vercel/postgres'
import { pgTable, text, serial, varchar, boolean } from 'drizzle-orm/pg-core'

import { drizzle } from 'drizzle-orm/vercel-postgres'

export const countryServedTable = pgTable("countryServed", {
  id: serial("id").primaryKey(),
  name: text("name"),
  status: boolean("status").notNull().default(true)
})

export const db = drizzle(sql)