import jwt from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode';
import { TUser } from '../models/User';

type TTokenPayload = {
  userId: string;
  iat: number;
  exp: number;
}

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '20m' });
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