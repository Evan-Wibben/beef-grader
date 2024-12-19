import { Pool } from 'pg';
import bcrypt from 'bcrypt';

export const dynamic = 'force-static';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Email and password are required.' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (user && await bcrypt.compare(password, user.password)) {
                return new Response(JSON.stringify({ id: user.id }), { 
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                return new Response(JSON.stringify({ error: 'Invalid credentials' }), { 
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
