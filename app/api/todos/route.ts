import { NextRequest, NextResponse } from "next/server";
import {
  getData,
  addTodo,
  getTodoById,
} from "../../../lib/actions/todoActions";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session:any = await auth()
  const todos = await getData(session?.user.id);
  return NextResponse.json({
    status: 200,
    todos,
  });
}

export async function POST(req: NextRequest) {
  const {title, description } = await req.json();
  await addTodo(title, description);
  return NextResponse.json({
    status: 201,
    message: "Todo added successfully",
  });
}



