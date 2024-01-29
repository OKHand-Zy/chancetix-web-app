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
        
        // 檢查帳號是否已存在
        const checkAccountResult = await client.query('SELECT * FROM memberaccount WHERE account = $1', [username]);
        if (checkAccountResult.rows.length > 0) {
            console.log('Account Already Exists');
            client.release();
            return res.status(409).json({ error: 'Username already exists' });
        }

        // 檢查密碼是否已存在
        const checkPasswordResult = await client.query('SELECT * FROM memberaccount WHERE password = $1', [password]);
        if (checkPasswordResult.rows.length > 0) {
            console.log('Password Already Exists');
            client.release();
            return res.status(409).json({ error: 'Password already exists' });
        }
        // 創建新使用者
        const createResult = await client.query('INSERT INTO memberaccount (account, password) VALUES ($1, $2) RETURNING *', [username, password]);

        client.release();
        res.status(201).json({ success: true, user: createResult.rows[0] });
        
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}