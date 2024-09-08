"use client";

import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
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
            className="bg-[#94a3b8]"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
};

export default page;
