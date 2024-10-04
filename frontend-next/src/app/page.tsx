import { redirect } from 'next/navigation';

export default async function Home() {
  redirect("/auth"); // Redirects immediately
  return <main className="md:min-w-[400px]"></main>; // This line will never be reached
}

