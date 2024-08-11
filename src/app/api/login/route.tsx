import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2'; // Import the correct type
import pool from 'src/lib/db';

interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Query the database for the user by email
      const [rows] = await pool.query<User[] & RowDataPacket[]>(
        'SELECT id, email, password FROM users WHERE email = ?',
        [email]
      );

      if (rows.length === 0) {
        // User not found
        return res.status(404).json({ error: 'User not found' });
      }

      const user = rows[0];

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // Invalid password
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Authentication successful
      res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
