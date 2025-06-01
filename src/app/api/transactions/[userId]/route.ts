import { NextRequest, NextResponse } from 'next/server';
import { Transaction } from '@/app/models/Transaction';
import { authMiddleware } from '@/app/middleware/authMiddleware';


/**
 * { GET }: Get all transactions of an user
 */

type TParams = {
  params: {
    userId: string;
  }
}

export async function GET(req: NextRequest, { params: { userId } }: TParams) {
  const authResponse = await authMiddleware(req)
  if(authResponse instanceof NextResponse) return authResponse

  const transaction = await Transaction.find({ userId });
  return NextResponse.json(transaction);
}
