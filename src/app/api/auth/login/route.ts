import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '@/app/lib/auth';
import cookie from 'cookie';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  const accessToken = generateAccessToken(user._id, user.fullName);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  const serialized = cookie.serialize('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return NextResponse.json({ accessToken }, { headers: { 'Set-Cookie': serialized } });
}
