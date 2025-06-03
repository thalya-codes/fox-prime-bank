import { NextRequest, NextResponse } from 'next/server';
import { Account } from '@/app/models/Account';
import { Transaction } from '@/app/models/Transaction';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import { JwtPayload } from 'jsonwebtoken';
import User from '@/app/models/User';


export async function POST(req: NextRequest) {
  const authResponse = await authMiddleware(req) as JwtPayload
  if(authResponse instanceof NextResponse) return authResponse

  const { fromAccountNumber, toAccountNumber, amount, description, nature } = await req.json();

  const userSender = await User.findById((authResponse).userId);
  if (!userSender) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  const fromAccount = await Account.findOne({ accountNumber: fromAccountNumber });

 if (!fromAccount) {
    return NextResponse.json({ message: 'Conta de origem não encontrada.' }, { status: 404 });
  }

  


  
  if (String(fromAccount.userId) !== String(userSender?._id)) {
    return NextResponse.json({ message: 'Você não tem permissão para realizar esta operação.' }, { status: 403 });
  }

  const toAccount = await Account.findOne({ accountNumber: toAccountNumber });

  const receiverUser = await User.findById(toAccount.userId);
  if (!receiverUser) return NextResponse.json({ message: 'Recipient user not found' }, { status: 404 });

  if (!toAccount) {
    return NextResponse.json({ message: 'Conta de destino não encontrada.' }, { status: 404 });
  }

  if (fromAccount.balance < amount) {
    return NextResponse.json({ message: 'Saldo insuficiente.' }, { status: 422 });
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  await fromAccount.save();
  await toAccount.save();

  const outgoingTransaction = await Transaction.create({
    amount,
    description,
    nature,
    senderId: userSender._id,
    senderName: userSender.fullName,
    receiverId: receiverUser._id,
    receiverName: receiverUser.fullName,
    direction: 'OUTGOING'
  });

  const incomingTransaction = await Transaction.create({
    amount: Number(amount),
    description,
    nature,
    senderId: userSender._id,
    senderName: userSender.fullName,
    receiverId: receiverUser._id,
    receiverName: receiverUser.fullName,
    direction: 'INCOMING'
  });

  await outgoingTransaction.save();
  await incomingTransaction.save();

  return NextResponse.json({ message: 'Transferência realizada com sucesso.' }, { status: 201 });
}