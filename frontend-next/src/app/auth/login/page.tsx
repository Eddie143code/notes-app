"use client";

import { redirect, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const handleSubmit = async (e: any) => {
   e.preventDefault()
    
   const payload = JSON.stringify({
        email: "g@example.com",
        
    })

    const response = await fetch('http://localhost:3001/user/me', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
        credentials: 'include'
    })
    console.log(response)
  };

  const handlePing = async () => {
    await fetch('http://localhost:3001/ping', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
  })
  }
  return (
    <main className="md:min-w-[400px]">
      <header className="flex flex-col items-center justify-center"></header>
      <div className=" ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>Email</label>
          <input name="email"></input>
          <button type="submit" className="bg-[#94a3b8]">
            Submit
          </button>
          <button
          type="button"
            className="bg-[#94a3b8]"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </button>
          <button type="button" onClick={handlePing}>ping</button>
        </form>
      </div>
    </main>
  );
};

export default page;
