import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// export const getCookies = async () => {
//     const cookieStore = cookies();
//     const userEmail = cookieStore.get("userEmail")?.value;
  
//     if (!userEmail) {
//       // Use Next.js server-side redirect
//       redirect("/auth/login");
//     }
  
//     const response = await fetch("http://localhost:3001/user/verify", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: userEmail }), // Send email in the request body
//       credentials: "include", // Send cookies with the request
//     });
  
//     const result = await response.json();
//     if (!response.ok) {
//       redirect("/auth/login");
//     }
  
//     return result; // Return result for further use if needed
//   };

  // app/middleware.ts
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

// export function middleware(request: NextRequest) {
//   console.log('in middleware')
//   return NextResponse.redirect(new URL("/auth/login", request.url));
// }

export const config = {
  matcher: ['/'], // Apply middleware to all routes except those containing '/auth'
};

