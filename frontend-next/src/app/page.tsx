
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

import { GetServerSideProps } from "next";
import { cookies } from "next/headers";

type noteData = {
  id: number;
  content: string;
};

export default function Home() {
  const cookieStore = cookies();
  const user = cookieStore.get('userSession')
  console.log('user: ' + user)
  if (!user) redirect("/auth/login");

  const data: noteData[] = [
    { id: 0, content: "Yo" },
    { id: 1, content: "Yes" },
    { id: 2, content: "Yup" },
    { id: 3, content: "Yep" },
  ];
  // const getCookies = async () => {
  //   const cookieStore = cookies();
  //   const userEmail = cookieStore.get("userEmail")?.value; // Get cookie value
  //   if (!userEmail) {
  //     redirect("/user/login");
  //     return;
  //   }

  //   const response = await fetch("http://localhost:3001/user/verify", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email: userEmail }), // Send email in the request body
  //     credentials: "include", // Send cookies with the request
  //   });

  //   const result = await response.json();
  //   console.log("response:", result);

  //   if (!response.ok) {
  //     redirect("/user/login");
  //   }
  // };


  return (
    <main className=" md:min-w-[400px] bg-[#64748B]">
      {/* {user && (
          <header className="flex flex-col items-center justify-center">
            <h1>Notes</h1>
            <h2>Hello, [user]</h2>
          </header>
        )} */}
      {data.map((note: noteData) => {
        return (
          <div key={note.id} className="p-2">
            {note.content}
          </div>
        );
      })}{" "}
    </main>
  );
}
