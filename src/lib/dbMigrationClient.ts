
import dotenv from 'dotenv';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { Pool } from 'pg';

dotenv.config({ path: `.env.local` });

// const sql = postgres("...", { max: 1 })
console.log(process.env.POSTGRES_URL as string);
const dbMigrateClient = drizzle(new Pool({ connectionString: process.env.POSTGRES_URL }));

(async () => {
  try {
    await migrate(dbMigrateClient, {
      migrationsFolder: "src/lib/drizzle"
    });
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
})();





