import Image from "next/image";
import { redirect } from "next/navigation";

type noteData = {
  id: number;
  content: string;
};

export default function Home() {
  const user = false;
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
