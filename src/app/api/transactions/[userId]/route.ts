import { authMiddleware } from "@/app/middleware/authMiddleware"
import { Transaction } from "@/app/models/Transaction"
import { NextRequest, NextResponse } from "next/server"

type TParams = {
   params: {  userId: string }
}

export async function GET(req: NextRequest, { params }: TParams) {
  const authResponse = await authMiddleware(req)
  if(authResponse instanceof NextResponse) return authResponse 

  const transactions = await Transaction.find({senderId: params.userId, direction: 'INCOMING' })
  
  if(!transactions) return NextResponse.json([], {status: 200})
  
 return NextResponse.json(transactions,  { status: 200 })
}