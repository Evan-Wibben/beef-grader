// lib/db.js
import { Pool } from 'pg';

// const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 30000,
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        console.log('Connected to database');
        release();
    }
});

export const query = (text, params) => pool.query(text, params);
export default pool;