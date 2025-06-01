import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import User from '@/app/models/User';
import { Account } from '@/app/models/Account';
import { connectDB } from '@/app/lib/db';

export async function POST(req: NextRequest) {
  await connectDB();

  const { fullName, birthDate, email, password , acceptTerm }  = await req.json();

  const existing = await User.findOne({ email });

  if (existing) {
    return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    birthDate,
    email,
    password: hashedPassword,
    acceptTerm
  });

  const accountNumber = uuidv4();
  
  await Account.create({
    userId: user._id,
    accountNumber,
    balance: 1000, 
  });

  return NextResponse.json({
    message: 'Conta aberta com sucesso',
    user: {
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      accountNumber,
      acceptTerm
    }
  });
}