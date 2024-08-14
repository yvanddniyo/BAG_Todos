import { NextRequest, NextResponse } from 'next/server';
import { deleteTodo, getTodoById, toggleTodo, updateTodo } from "../../../../lib/actions/todoActions"


export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
    const todo = await getTodoById(params.id);
    if (!todo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    await deleteTodo(params.id);
    return NextResponse.json({ message: 'Todo deleted successfully' });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {
  const todo = await getTodoById(params.id);
  
  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  const { title, description } = await req.json();
  
  // Check if at least one field is provided
  if (!title && !description) {
    return NextResponse.json({ message: "No values to update" }, { status: 400 });
  }

  await updateTodo(params.id, title, description);
  
  return NextResponse.json({ message: 'Todo updated successfully' });
}



export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
    const todo = await getTodoById(params.id);
    if (!todo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    await toggleTodo(params.id);
    return NextResponse.json({ message: 'Todo toggled successfully' });
}