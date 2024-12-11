import { Pool } from 'pg';

export const dynamic = "force-dynamic";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Received cow submission data:', data); // Debug log for incoming data
        
        const { breed, age, pasture, notes, bcs_score, userId, pastureId } = data; // Include userId in the request

        // Validate required fields
        if (!breed || age === undefined || !pasture || !notes || !bcs_score || !userId || !pastureId) {
            return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
        }

        const client = await pool.connect();
        try {
            const result = await client.query(
                'INSERT INTO cows (breed, age, pasture, notes, bcs_score, user_id, pasture_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [breed, age, pasture, notes, bcs_score, userId, pastureId] // Insert userId into the cows table
            );
            
            console.log('Cow submitted successfully:', result.rows[0]); // Log successful submission
            
            return new Response(JSON.stringify(result.rows[0]), { status: 201 });
        } finally {
            client.release(); // Ensure the client is released back to the pool
        }
    } catch (error) {
        console.error('Error submitting cow data:', error);
    }
}