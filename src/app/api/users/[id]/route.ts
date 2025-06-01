import { authMiddleware } from "@/app/middleware/authMiddleware";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await authMiddleware(req);

  const user = await User.findById(params.id);
  return NextResponse.json(user);
}
