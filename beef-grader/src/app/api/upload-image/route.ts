import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { image } = await request.json();

        // Remove the data:image/jpeg;base64, part
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        // Create a unique filename
        const uniqueFilename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.jpg`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, uniqueFilename);

        // Ensure the upload directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        // Write the file
        await fs.writeFile(filePath, buffer);

        // Return the path relative to the public directory
        return NextResponse.json({ imagePath: `/uploads/${uniqueFilename}` });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
