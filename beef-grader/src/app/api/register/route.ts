import { Pool } from 'pg';
import bcrypt from 'bcrypt';

export const dynamic = "force-dynamic";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { email, password } = data;

        // Validate required fields
        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
        }

        const client = await pool.connect();
        try {
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the database
            const result = await client.query(
                'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
                [email, hashedPassword]
            );

            return new Response(JSON.stringify({ id: result.rows[0].id }), { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error registering user:', error);
    }
}