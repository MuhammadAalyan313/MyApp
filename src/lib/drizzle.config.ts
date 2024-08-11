// src/lib/drizzle.config.ts
import { Pool } from 'pg';
import { drizzle as createDrizzleInstance } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const drizzle = createDrizzleInstance(pool);
