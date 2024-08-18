" use server ";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db/drizzle";
import { todos } from "../db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getTodoById(id: string) {
  return await db.query.todos.findFirst({ where: eq(todos.user_id, id) });
}
export async function getTodoId(id: number) {
  return await db.query.todos.findFirst({ where: eq(todos.id, id) });
}

export const getData = async (id: string) => {
  const data = await db.select().from(todos).where(eq(todos.user_id, id));
  return data;
};

export const addTodo = async (title: string, description: string) => {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/");
  }
  await db.insert(todos).values({
    title: title,
    description: description,
    user_id: session?.user?.id,
  });
};

export const deleteTodo = async (id: number) => {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
};

export const toggleTodo = async (id: number) => {
  await db
    .update(todos)
    .set({
      done: not(todos.done),
    })
    .where(eq(todos.id, id));
  revalidatePath("/");
};

export const updateTodo = async (
  id: number,
  title?: string,
  description?: string
) => {
  if (!title && !description) {
    throw new Error("No values to update");
  }
  const updates: Partial<{ title: string; description: string }> = {};

  if (title) {
    updates.title = title;
  }

  if (description) {
    updates.description = description;
  }

  await db.update(todos).set(updates).where(eq(todos.id, id));

  revalidatePath("/");
};
