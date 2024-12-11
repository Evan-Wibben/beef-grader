// File: app/api/pastures/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db'; // Adjust path based on your structure

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

        // Validate input
        if (!name || !userId) {
            return new Response(JSON.stringify({ error: 'Name and user ID are required.' }), { status: 400 });
        }

        // Insert the new pasture into the database
        const result = await pool.query(
            'INSERT INTO pastures (name, user_id) VALUES ($1, $2) RETURNING *',
            [name, userId]
        );

        console.log('Pasture added successfully:', result.rows[0]);
        return NextResponse.json(result.rows[0], { status: 201 }); // Return the newly created pasture
    } catch (error) {
        console.error('Error adding pasture:', error);
        return new Response(JSON.stringify({ error: 'Failed to add pasture.' }), { status: 500 });
    }
}
