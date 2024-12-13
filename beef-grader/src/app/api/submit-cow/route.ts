import { Pool } from 'pg';

export const dynamic = "force-dynamic";

let pool: Pool;

// Initialize the pool lazily
function getPool() {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('DATABASE_URL is not set');
        }
        pool = new Pool({ connectionString });
    }
    return pool;
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Received cow submission data:', data);
        
        const { breed, age, pasture, notes, bcs_score, userId, pastureId, imagePath } = data;

        // Validate required fields
        if (!breed || !bcs_score || !userId) {
            return new Response(JSON.stringify({ error: 'Breed, BCS score, and user ID are required.' }), { status: 400 });
        }

        // Additional validation
        if (typeof breed !== 'string' || typeof bcs_score !== 'string' || typeof userId !== 'string') {
            return new Response(JSON.stringify({ error: 'Invalid data types for required fields.' }), { status: 400 });
        }

        const client = await getPool().connect();
        try {
            const result = await client.query(
                'INSERT INTO cows (breed, age, pasture, notes, bcs_score, user_id, pasture_id, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [breed, age || null, pasture || null, notes || null, bcs_score, userId, pastureId || null, imagePath || null]
            );
            
            console.log('Cow submitted successfully:', result.rows[0]);
            
            return new Response(JSON.stringify(result.rows[0]), { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error submitting cow data:', error);
        // Log the full error details
        console.error(error instanceof Error ? error.stack : String(error));
        return new Response(JSON.stringify({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }), { status: 500 });
    }
}