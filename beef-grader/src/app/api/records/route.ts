import { NextResponse } from 'next/server';
import pool from '../../../lib/db'; // Adjust the path as needed

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    try {
        const result = await pool.query(`
            SELECT c.id, c.breed, c.age, p.name as pasture, c.notes, c.bcs_score
            FROM cows c
            LEFT JOIN pastures p ON c.pasture_id = p.id
            WHERE p.user_id = $1 OR c.pasture_id IS NULL
        `, [userId]);

        // Log the result for debugging
        console.log('Cows fetched:', result.rows);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching cow records:', error);
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
        // Check if the cow belongs to the user
        const checkResult = await pool.query(`
            SELECT c.id
            FROM cows c
            LEFT JOIN pastures p ON c.pasture_id = p.id
            WHERE (p.user_id = $1 OR p.user_id IS NULL) AND c.id = $2
        `, [userId, cowId]);

        if (checkResult.rows.length === 0) {
            return NextResponse.json({ error: 'Cow not found or not owned by user.' }, { status: 404 });
        }

        // If the check passes, delete the cow from the database
        await pool.query('DELETE FROM cows WHERE id = $1', [cowId]);

        return NextResponse.json({ message: 'Cow record deleted successfully' });
    } catch (error) {
        console.error('Error deleting cow record:', error);
    }
}