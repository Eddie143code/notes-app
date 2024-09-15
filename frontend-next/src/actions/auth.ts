"use server"
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const getCookies = async () => {
    const cookieStore = cookies();
    const userEmail = cookieStore.get("userEmail")?.value;
  
    if (!userEmail) {
      // Use Next.js server-side redirect
      redirect("/auth/login");
    }
  
    const response = await fetch("http://localhost:3001/user/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }), // Send email in the request body
      credentials: "include", // Send cookies with the request
    });
  
    const result = await response.json();
    if (!response.ok) {
      redirect("/auth/login");
    }
  
    return result; // Return result for further use if needed
  };

export const signup = async () => {
    const payload = JSON.stringify({
        email: "z@example.com",
        password: "m134"
    });

    try {
        const response = await fetch('http://localhost:3001/user/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Corrected method name
        console.log(data); // Log the parsed JSON data
    } catch (error) {
        console.error('Error:', error);
    }
};


// export const sigin = async () => {
//     const payload = JSON.stringify({
//         email: "z@example.com",
//     })

// await fetch('http://localhost:3001/user/me', {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: payload,
//     })
// }