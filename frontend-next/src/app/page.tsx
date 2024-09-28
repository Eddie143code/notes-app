

type noteData = {
  id: number;
  content: string;
};

export default async function Home() {
  // const cookieStore = cookies();
  // const user = cookieStore.get('userSession')
//   const response = await fetch('http://localhost:3001/user/me', {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//     credentials: 'include'
// })
// console.log(response.ok)
  // if (!response.ok) redirect("/auth/login");
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

