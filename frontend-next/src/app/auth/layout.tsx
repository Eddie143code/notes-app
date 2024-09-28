import { cookies } from "next/headers";
import React from "react";

type noteData = {
  id: number;
  content: string;
};

const Layout = ({ children }: any) => {
  const cookieStore = cookies();
  const userEmail = cookieStore.get("userEmail")?.value;

  return (
    <main>
      {userEmail && (
        <header className="flex flex-col items-center justify-center">
          <h1>Notes</h1>
          <h2>Hello, {userEmail}</h2>
        </header>
      )}
      <div className=" mt-2 bg-[#64748B]">{children}</div>
    </main>
  );
};

export default Layout;
