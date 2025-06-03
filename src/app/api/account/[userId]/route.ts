import { authMiddleware } from "@/app/middleware/authMiddleware";
import { Account } from "@/app/models/Account";
import { NextRequest, NextResponse } from "next/server";

type TParams = {
  params: {
    userId: string;
  }
}

export async function GET(req: NextRequest, { params: { userId } }: TParams) {
    const authResponse = await authMiddleware(req)
    if(authResponse instanceof NextResponse) return authResponse

    const account = await Account.find({ userId });
    return NextResponse.json(account);
}