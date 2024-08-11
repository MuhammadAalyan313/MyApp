import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2'; // Import the correct type
import pool from 'src/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Query the database for the user by email
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT email FROM users WHERE email = ?',
        [email]
      );

      if (rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const [result] = await pool.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword]
      );

      if (result.affectedRows > 0) {
        res.status(201).json({ message: 'User created successfully' });
      } else {
        res.status(500).json({ message: 'Error creating user' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
