import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get('userId'); // Check if userId cookie exists

    console.log(`Accessing ${request.nextUrl.pathname}. Logged in: ${!!isLoggedIn}`);

    // If the user is not logged in and trying to access a protected route
    if (!isLoggedIn && request.nextUrl.pathname !== '/login') {
        console.log('Redirecting to login...');
        return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
    }

    return NextResponse.next(); // Allow the request to continue
}

// Apply middleware only to specific paths
export const config = {
    matcher: ['/dashboard/:path*', '/pastures/:path*', '/records/:path*', '/create-entry/:path*'],
};