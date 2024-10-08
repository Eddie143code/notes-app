"use client";

import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const a = await signup({ email, password });

    router.push("/auth/login");
  };
  return (
    <main className="md:min-w-[400px]">
      <header className="flex flex-col items-center justify-center"></header>
      <div className=" ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="name" className="border-1 border">
            Name
          </label>
          <input name="username"></input>
          <label htmlFor="email">Email</label>
          <input name="email"></input>
          <label htmlFor="password">Password</label>
          <input name="password"></input>
          <button type="submit" className="bg-[#94a3b8]">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;
