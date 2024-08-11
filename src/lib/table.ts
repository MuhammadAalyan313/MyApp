// src/lib/createTables.ts
import { drizzle } from './drizzle.config';
import { users } from './schema';

async function createTables() {
  try {
    await drizzle.createTable(users);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}

createTables().then(() => process.exit());
