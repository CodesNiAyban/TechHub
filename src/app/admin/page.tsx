import getSession from "@/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function Page() {
  const session = await getSession();
  const user = session?.user;

  if(!user) {
    redirect("/api/auth/signin?callbackUrl=/admin")
  }

  if (user.role !== "admin") {
    return <main className="mx-auto my-10">
      <p className="text-center">You are not authorized to view this page</p>
    </main>
  }

  const users = await prisma.user.findMany();

  return (
    <main className="mx-auto my-10 space-y-3">
    <main className="flex flex-col items-center gap-6 px-3 py-10">
      <h1 className="text-center text-4xl font-bold">TechHub</h1>
      <h2 className="text-center text-2xl font-semibold">Users</h2>
      <ul className="list-inside list-disc">
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/user/${user.id}`} className="hover:underline">
              {user.name || `User ${user.id}`}
            </Link>
          </li>
        ))}
      </ul>
    </main>
    </main>
  );
}
