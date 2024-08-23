"use server";

import AddTodo from "@/components/Todos/addTodo";
import Todo from "@/components/Todos/todo";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Dark } from "@/components/darkMode/darkMode";

export default async function page() {
  const session: any = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <main className="w-full md:px-12 py-12 px-3">
      <Dark session={session?.user} />
      <AddTodo />
      <Todo />
    </main>
  );
}
