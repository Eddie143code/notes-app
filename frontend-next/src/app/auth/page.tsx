import { cookies } from "next/headers"; // For server-side cookies

// type noteData = {
//   id: number;
//   content: string;
// };

import Notes from "@/components/notes/note";

export default async function Page() {
  // Get the cookie on the server side
  const userEmail = cookies().get("userEmail")?.value;
  
  const response: any = await fetch('http://localhost:3001/note/all', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userEmail=${userEmail}`, // Add the cookie to the headers
      },
      credentials: "include", // Important for including cookies

  })

  const data = await response.json();
  return (
    <main className="">
      <Notes data={data}/>
    </main>
  );
}
