import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    console.log('in middleware')
  const cookieStore = req.cookies;
  const userEmail = cookieStore.get('userEmail');

  if (!userEmail) {
    // Redirect to login if no cookie
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Check email in the database
  
  const response = await fetch("http://localhost:3001/user/verify", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail }), // Send email in the request body
    credentials: "include", // Send cookies with the request
  });
  if (!response) {
    // Clear cookie and redirect to login if email is invalid
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('userEmail');
    return response;
  }

  // Continue with the request if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Apply middleware to all routes except those containing '/auth'
};

