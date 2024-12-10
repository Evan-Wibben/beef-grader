import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
    try {
        const data = await request.json();
        const { breed, age, pasture, notes, bcs_score } = data;

        // Validate required fields
        if (!breed || age === undefined || !pasture || !notes || !bcs_score) {
            return new Response(JSON.stringify({ error: 'All fields except imageUrl are required.' }), { status: 400 });
        }

        const client = await pool.connect();
        try {
            const result = await client.query(
                'INSERT INTO cows (image_url, breed, age, pasture, notes, bcs_score) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [null, breed, age, pasture, notes, bcs_score]
            );
            return new Response(JSON.stringify(result.rows[0]), { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error submitting cow data:', error);
        return new Response(JSON.stringify({ error: 'Error submitting cow data', details: error.message }), { status: 500 });
    }
}