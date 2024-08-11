// src/lib/migrations/2024_08_03_001_create_users.ts
import { signup } from '../schema';

export const up = async (db) => {
  await db.createTable(signup);
};

export const down = async (db) => {
  await db.dropTable(signup);
};
