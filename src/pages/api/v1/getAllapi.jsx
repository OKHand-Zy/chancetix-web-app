import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGSQL_USER,
  host: process.env.PGSQL_HOST,
  database: process.env.PGSQL_DATABASE,
  password: process.env.PGSQL_PASSWORD,
  port: process.env.PGSQL_PORT, // 請確保與你的資料庫端口一致
});

export default async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM api');
    const data = result.rows;

    client.release();
    res.status(200).json({ data });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};