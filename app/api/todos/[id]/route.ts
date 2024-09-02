import { NextRequest, NextResponse } from "next/server";
import {
  deleteTodo,
  getTodoById,
  getTodoId,
  toggleTodo,
  updateTodo,
} from "../../../../lib/actions/todoActions";
import { auth } from "@/auth";


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        message: 'Unauthorized'
      })
    }
    const IdNumber = Number(params.id);
    const todo = await getTodoId(IdNumber);
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    await deleteTodo(IdNumber);
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const IdNumber = Number(params.id);
  const todo = await getTodoId(IdNumber);

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  const { title, description } = await req.json();
  if (!title || !description) {
    return NextResponse.json(
      { message: `No values provided title or description.` },
      { status: 400 }
    );
  }

  await updateTodo(IdNumber, title, description);

  return NextResponse.json({ message: "Todo updated successfully" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const IdNumber = Number(params.id);
  const todo = await getTodoId(IdNumber);
  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }
  await toggleTodo(IdNumber);
  return NextResponse.json({ message: "Todo toggled successfully" });
}
