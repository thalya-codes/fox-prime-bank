import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import User from '@/app/models/User';

type TResponse = {
  params: {
    userId: string
  }
}

export async function POST(req: NextRequest, { params: { userId } }: TResponse) {
  const authResponse = await authMiddleware(req)
  if(authResponse instanceof NextResponse) return authResponse

  const { currentPassword, newPassword } = await req.json();

  //Verify if user exists
  const user = await User.findOne({_id: userId})
  if(!user) return NextResponse.json({ message: 'User not founded' }, { status: 404 });

  //Validate current password
  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return NextResponse.json({ message: 'Invalid current password' }, { status: 400 });

  //Change passrod
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return NextResponse.json({ message: 'Password updated' });
}
