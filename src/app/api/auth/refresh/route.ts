import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User';
import { generateAccessToken, verifyRefreshToken } from '@/app/lib/auth';
import cookie from 'cookie';

export async function POST(req: NextRequest) {
  await connectDB();

  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) return NextResponse.json({ message: 'Nenhum refresh token foi encontrado' }, { status: 401 });

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ message: 'Refresh token inválido' }, { status: 403 });
    }

    const newAccessToken = generateAccessToken(user._id, user.fullName);

    return NextResponse.json({ accessToken: newAccessToken });
  } catch {
    return NextResponse.json({ message: 'Token inválido' }, { status: 403 });
  }
}
