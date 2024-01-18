import { Pool } from 'pg';

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'test',
  password: '111111',
  port: 5432, // 請確保與你的資料庫端口一致
});

export default async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const data = result.rows;

    client.release();
    res.status(200).json({ data });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};