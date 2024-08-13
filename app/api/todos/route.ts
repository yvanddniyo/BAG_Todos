import { NextRequest, NextResponse } from "next/server";
import {
  getData,
  addTodo,
} from "../../../lib/actions/todoActions";
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextRequest) {
  const todos = await getData();
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


