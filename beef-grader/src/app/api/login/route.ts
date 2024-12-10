import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Validate required fields
        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
        }

        const client = await pool.connect();
        try {
            // Look up the user by email
            const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            // Check if user exists and verify password
            if (user && await bcrypt.compare(password, user.password)) {
                return new Response(JSON.stringify({ id: user.id }), { status: 200 }); // Return user ID on successful login
            } else {
                return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
            }
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
}