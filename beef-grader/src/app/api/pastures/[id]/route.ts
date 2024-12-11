import { NextResponse } from 'next/server';
import pool from '../../../../lib/db'; // Adjust the path as needed

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Await the params object

    try {
        // Fetch pasture details
        const pastureResult = await pool.query('SELECT * FROM pastures WHERE id = $1', [id]);

        if (pastureResult.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Pasture not found' }), { status: 404 });
        }

        const pasture = pastureResult.rows[0];

        // Fetch cows associated with this pasture
        const cowsResult = await pool.query('SELECT * FROM cows WHERE pasture_id = $1', [id]);

        // Combine pasture details and cows
        const response = {
            ...pasture,
            cows: cowsResult.rows,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching pasture details:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch pasture details.' }), { status: 500 });
    }
}