import { users } from 'src/lib/schema';
import bcrypt from 'bcryptjs';

// Use a type to describe the database instance
let db: any;

// Function to initialize database connection
const initializeDb = async () => {
  if (typeof window === 'undefined') {
    // Only run this on the server side
    const { db: dbModule } = await import('src/lib/db');
    db = dbModule;
  }
};

// Call the initialization function
initializeDb();

export const insertUser = async (email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (!db) {
      throw new Error("Database connection is unavailable on the client side.");
    }

    await db.insert(users).values({ email, password: hashedPassword }).execute();
    return { success: true };
  } catch (error) {
    console.error('Error inserting user:', error);
    return { success: false, error };
  }
};
