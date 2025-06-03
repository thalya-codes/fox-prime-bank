import jwt from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode';
import { TUser } from '../models/User';

export type TTokenPayload = {
  userId: string;
  fullName: string;
  iat: number;
  exp: number;
}

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export function generateAccessToken(userId: string, fullName: string) {
  return jwt.sign({ userId, fullName }, ACCESS_SECRET, { expiresIn: '20m' });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as Omit<TUser, '_id'> & {userId: string};
}


export function getDecodedAccessInfo(token: string): TTokenPayload | null {
  try {
    const decoded = jwtDecode<TTokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}

export function verifyIfTokenIsExpired(token: string) {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Math.floor(Date.now() / 1000); // em segundos

  return payload.exp < currentTime;
}

export function getTokenExpiration(token: string): number {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000; 
}

export function scheduleTokenRefresh(token: string, refresh: () => Promise<void>) {
  const expiration = getTokenExpiration(token);
  const now = Date.now();
  const timeUntilExpiration = expiration - now;

  const refreshTime = timeUntilExpiration - 60_000;

  if (refreshTime > 0) {
    setTimeout(refresh, refreshTime);
  }
}
