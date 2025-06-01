import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const users = await User.find()
  return new NextResponse(JSON.stringify(users), {status: 200})
}