import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export const dynamic = 'force-static';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        // Fetch pasture details
        const pastureResult = await pool.query('SELECT * FROM pastures WHERE id = $1', [id]);

        if (pastureResult.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Pasture not found' }), { status: 404 });
        }

        const pasture = pastureResult.rows[0];

        const cowsResult = await pool.query('SELECT id, breed, age, notes, bcs_score, image_url FROM cows WHERE pasture_id = $1', [id]);

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

// Updated DELETE method to remove a cow from a pasture
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const cowId = searchParams.get('cowId');

    if (!cowId) {
        return new Response(JSON.stringify({ error: 'Cow ID is required.' }), { status: 400 });
    }

    try {
        await pool.query('UPDATE cows SET pasture_id = NULL WHERE id = $1', [cowId]);

        return NextResponse.json({ message: 'Cow removed from pasture successfully' });
    } catch (error) {
        console.error('Error removing cow from pasture:', error);
        return new Response(JSON.stringify({ error: 'Failed to remove cow from pasture.' }), { status: 500 });
    }
}

export async function generateStaticParams() {
    const result = await pool.query('SELECT id FROM pastures');
    return result.rows.map(row => ({ id: row.id.toString() }));
  }