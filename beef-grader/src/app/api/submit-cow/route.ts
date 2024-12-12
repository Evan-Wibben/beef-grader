import { Pool } from 'pg';

export const dynamic = "force-dynamic";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Received cow submission data:', data);
        
        const { breed, age, pasture, notes, bcs_score, userId, pastureId, imagePath } = data;

        // Validate required fields
        if (!breed || age === undefined || !pasture || !notes || !bcs_score || !userId || !pastureId) {
            return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
        }

        const client = await pool.connect();
        try {
            const result = await client.query(
                'INSERT INTO cows (breed, age, pasture, notes, bcs_score, user_id, pasture_id, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [breed, age, pasture, notes, bcs_score, userId, pastureId, imagePath]
            );
            
            console.log('Cow submitted successfully:', result.rows[0]);
            
            return new Response(JSON.stringify(result.rows[0]), { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error submitting cow data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}