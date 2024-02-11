import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/schema.ts',
  out: './src/lib/drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE!,
  },
} satisfies Config;