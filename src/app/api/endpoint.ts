import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from 'src/lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await pool.query('SELECT * FROM table');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
