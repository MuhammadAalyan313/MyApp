// src/lib/schema.ts
import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

// Define the schema for the 'users' table
export const users = pgTable('signup', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
