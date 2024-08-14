import { NextResponse } from 'next/server';
//import { verifyToken } from './lib/auth'; // Adjust the path as necessary
import { jwtVerify } from 'jose';
const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET ;
export async function middleware(request) {
    const { pathname } = request.nextUrl;
    console.log("Middleware execution path:", pathname);

    // Bypass middleware for static files and authentication routes
    if (pathname.startsWith('/_next') || pathname.startsWith('/api/abc')) {
        console.log("Bypassing middleware for:", pathname);
        return NextResponse.next(); // Allow the request to proceed without further processing
    }

    // Get the token from the Authorization header
    console.log("okay i am here");
    const authHeader = request.headers.get('Authorization');
    let token = authHeader ? authHeader.split(' ')[1] : null;

    // If token is not in headers, check query parameters
    if (!token) {
        token = request.nextUrl.searchParams.get('token');
        console.log("Token extracted from query params:", token);
    } else {
        console.log("Token extracted from headers:", token);
    }

    if (!token) {
        // If no token is provided in either header or query params, redirect to the login page
        console.log("No token provided. Redirecting to login.");
        const loginUrl = new URL('/login', request.nextUrl.origin);
        return NextResponse.redirect(loginUrl);
    }

    // Verify the token
    try {
        const secret = new TextEncoder().encode(SECRET_KEY); // Convert the secret to Uint8Array
        const { payload } = await jwtVerify(token, secret);
        console.log("Token payload:", payload);
    
        // Additional token payload checks can be performed here
    
      } catch (error) {
        console.error("Token verification failed:", error.message);
        // If the token is invalid, redirect to the login page
        console.log("Invalid token. Redirecting to login.");
        const loginUrl=new URL ('/login',request.nextUrl.origin);
        return NextResponse.redirect(loginUrl);
      }


    if (pathname == '/browse' || pathname=='/movies' || pathname=='/tvShows' || pathname=='/myList') {
        const screenId = request.nextUrl.searchParams.get('screenId');

        if (!screenId) {
            console.log("No screen ID found. Redirecting to screens page.");
            const screensUrl = new URL('/screens', request.nextUrl.origin);
            return NextResponse.redirect(screensUrl);
        }
    }

    // Allow the request to proceed if the token is valid
    console.log("Valid token. Allowing request to proceed.");
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/screens', '/api/updateScreen', '/browse','/myList','/movies','/tvShows'], // Apply middleware to these routes
};
