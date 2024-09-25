import Image from "next/image";
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
  return (
    <main className=" md:min-w-[400px] bg-[#64748B]">
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
