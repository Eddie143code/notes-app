import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const userEmail = req.cookies.get("userEmail")?.value; // Get the actual cookie value

  if (!userEmail) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const response = await fetch("http://localhost:3001/user/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userEmail=${userEmail}`, // Add the cookie to the headers
      },
      body: JSON.stringify({ email: userEmail }), // Optional since you're verifying by cookie
      credentials: "include", // Important for including cookies
    });
    if (!response.ok) {
      const redirectResponse = NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
      // redirectResponse.cookies.delete('userEmail');
      return redirectResponse;
    }

    return NextResponse.next(); // Allow the request to proceed

  } catch (error) {
    console.error("Error during fetch:", error);
    // return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

// Add a config to define specific routes where the middleware should run
export const config = {
  matcher: ["/auth"], // Add specific paths
};
