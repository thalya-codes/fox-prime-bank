import { getDecodedAccessInfo, scheduleTokenRefresh } from "@/app/lib/auth";
import { verifyIfUserHasAccessToken } from "@/app/lib/localStorage";
import { apiRequest, TApiRequest } from "@/app/lib/request";

export type TCredenditals = {
  email: string | null;
  password: string | null;
}

export type TOpenAccountData = {
  fullName: string;
  birthDate: string;
  acceptTerm: boolean
} & TCredenditals


type TChangePassword = {
  currentPassword: string;
  newPassword: string;
}

export type TRequestMessage = {
  message: string
}

 
export async function openAccount(data: TOpenAccountData) {
  const response = await apiRequest('/api/auth/register', 'POST', data) as TApiRequest;
  return response;
}


export async function signIn(data: TCredenditals) {
  const { responseData, status } = await apiRequest('/api/auth/login', 'POST', data) as TApiRequest;

  if (responseData?.accessToken) {
    localStorage.setItem('access_token', responseData?.accessToken);
    return;
  }

  return { responseData, status };
}

export async function logout() {
  const { responseData, accessToken , status } = await apiRequest('/api/auth/logout', 'POST', undefined, true) as TApiRequest;
  if (!accessToken) return;

  localStorage.removeItem('access_token');
  return  { responseData, accessToken , status}  
}

export async function changePassword(data: TChangePassword) {
  const accessToken = verifyIfUserHasAccessToken();
  if (!accessToken) return;

  const decodedInfos = getDecodedAccessInfo(accessToken);
  if (!decodedInfos) return;

  const { responseData, status } = await apiRequest(
    `/api/auth/change-password/${decodedInfos.userId}`,
    'POST',
    data,
    true
  ) as TApiRequest;

  return { responseData, accessToken, status };
}

export async function refreshAccessToken() {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Refresh token inválido');
  }

  const data = await res.json();

  scheduleTokenRefresh(data.accessToken, refreshAccessToken);
}