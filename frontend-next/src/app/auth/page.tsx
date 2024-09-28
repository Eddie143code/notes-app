import { cookies } from "next/headers";

type noteData = {
  id: number;
  content: string;
};

export default async function Home() {
  const data: noteData[] = [
    { id: 0, content: "Yo" },
    { id: 1, content: "Yes" },
    { id: 2, content: "Yup" },
    { id: 3, content: "Yep" },
  ];
  return (
    <main className="">
      {data.map((note: noteData) => {
        return (
          <div key={note.id} className="p-2">
            {note.content}
          </div>
        );
      })}
    </main>
  );
}
