import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.PGSQL_USER,
    host: process.env.PGSQL_HOST,
    database: process.env.PGSQL_DATABASE,
    password: process.env.PGSQL_PASSWORD,
    port: process.env.PGSQL_PORT, // 請確保與你的資料庫端口一致
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  try {
    const client = await pool.connect();

    // 檢查帳號密碼是否正確
    const result = await client.query(
        'SELECT * FROM memberaccount WHERE account = $1 AND password = $2',
        [username, password]
    );

    if (result.rows.length > 0) {
      // 登入成功
        client.release();
        return res.status(200).json({ success: true, user: result.rows[0] });
    } else {
      // 登入失敗
        client.release();
        return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}