import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';
import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User';

export async function POST(req: NextRequest) {
  await connectDB();

  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const refreshToken = cookies.refreshToken;

  if (refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  const serialized = cookie.serialize('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  });

  return NextResponse.json({ message: 'Logged out' }, { headers: { 'Set-Cookie': serialized } });
}
