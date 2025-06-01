import { NextRequest, NextResponse } from 'next/server';
import { Transaction } from '@/app/models/Transaction';
import { authMiddleware } from '@/app/middleware/authMiddleware';

type TParams = {
  params: {
    userId: string;
    transactionId: string;
  }
}


/**
 * Do CRUD operations for a specific user transaction
 */

export async function GET(req: NextRequest, { params: { userId, transactionId } }: TParams) {
  const authResponse = await authMiddleware(req)
  if(authResponse instanceof NextResponse) return authResponse

  const transaction = await Transaction.findOne({
    _id: transactionId,
    senderId: userId,
    receiverId: userId
  });

  if (!transaction) {
    return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 });
  }

  return NextResponse.json(transaction);
}

export async function PATCH(req: NextRequest, { params: { userId, transactionId } }: TParams) {
  const authResponse = await authMiddleware(req)
  if(authResponse instanceof NextResponse) return authResponse

  const body = await req.json();

  const transaction = await Transaction.findOneAndUpdate(
    { 
      _id: transactionId,     
      senderId: userId,
     receiverId: userId 
    },
    { $set: body },
    { new: true }
  );

  if (!transaction) {
    return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 });
  }

  return NextResponse.json(transaction);
}

export async function DELETE(req: NextRequest, { params: { userId, transactionId } }: TParams) {
  const authResponse = await authMiddleware(req)
  if(authResponse instanceof NextResponse) return authResponse

  const result = await Transaction.deleteOne({
    _id: transactionId,
    senderId: userId,
    receiverId: userId
  });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Transação deletada com sucesso' });
}
