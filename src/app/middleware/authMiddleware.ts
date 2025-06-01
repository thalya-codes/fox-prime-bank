import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/app/lib/auth';
import { connectDB } from '@/app/lib/db';

export async function authMiddleware(req: NextRequest) {
  await connectDB();
  
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyAccessToken(token);
    return payload;

  } catch {
    return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
  }
}
