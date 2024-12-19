import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export const dynamic = 'force-static';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    try {
        const result = await pool.query(`
            SELECT c.id, c.breed, c.age, p.name as pasture, c.notes, c.bcs_score, c.image_url
            FROM cows c
            LEFT JOIN pastures p ON c.pasture_id = p.id
            WHERE p.user_id = $1 OR c.pasture_id IS NULL
        `, [userId]);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching cow records:', error);
        return NextResponse.json({ error: 'Failed to fetch cow records' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const cowId = searchParams.get('cowId');

    if (!userId || !cowId) {
        return NextResponse.json({ error: 'User ID and Cow ID are required.' }, { status: 400 });
    }

    try {
        const checkResult = await pool.query(`
            SELECT c.id
            FROM cows c
            LEFT JOIN pastures p ON c.pasture_id = p.id
            WHERE (p.user_id = $1 OR p.user_id IS NULL) AND c.id = $2
        `, [userId, cowId]);

        if (checkResult.rows.length === 0) {
            return NextResponse.json({ error: 'Cow not found or not owned by user.' }, { status: 404 });
        }

        await pool.query('DELETE FROM cows WHERE id = $1', [cowId]);

        return NextResponse.json({ message: 'Cow record deleted successfully' });
    } catch (error) {
        console.error('Error deleting cow record:', error);
    }
}