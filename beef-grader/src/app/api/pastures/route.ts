// File: app/api/pastures/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export const dynamic = "force-dynamic";

// Handle GET requests
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return new Response(JSON.stringify({ error: 'User ID is required.' }), { status: 400 });
    }

    try {
        const result = await pool.query('SELECT * FROM pastures WHERE user_id = $1', [userId]);
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching pastures:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch pastures.' }), { status: 500 });
    }
}

// Handle POST requests
export async function POST(request: Request) {
    try {
        const data = await request.json(); // Parse the JSON body of the request
        const { name, userId } = data; // Destructure the necessary fields

        if (!name || !userId) {
            return new Response(JSON.stringify({ error: 'Name and user ID are required.' }), { status: 400 });
        }

        const result = await pool.query(
            'INSERT INTO pastures (name, user_id) VALUES ($1, $2) RETURNING *',
            [name, userId]
        );

        console.log('Pasture added successfully:', result.rows[0]);
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Error adding pasture:', error);
        return new Response(JSON.stringify({ error: 'Failed to add pasture.' }), { status: 500 });
    }
}

// Handle DELETE requests
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!id || !userId) {
        return new Response(JSON.stringify({ error: 'Pasture ID and User ID are required.' }), { status: 400 });
    }

    try {
        const result = await pool.query('DELETE FROM pastures WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
        
        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'Pasture not found or user not authorized.' }), { status: 404 });
        }

        return NextResponse.json({ message: 'Pasture deleted successfully' });
    } catch (error) {
        console.error('Error deleting pasture:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete pasture.' }), { status: 500 });
    }
}