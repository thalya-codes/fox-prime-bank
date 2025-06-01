import { getDecodedAccessInfo } from "@/app/lib/auth";
import { verifyIfUserHasAccessToken } from "@/app/lib/localStorage";
import { apiRequest, TApiRequest } from "@/app/lib/request";

type TCredenditals = {
  email: string;
  password: string;
}

type TOpenAccountData = {
  fullName: string;
  birthDate: string;
  acceptTerm: boolean
} & TCredenditals


type TChangePassword = {
  currentPassword: string;
  newPassword: string;
}

type TRequestResponse = {
  message: string
}

export async function openAccount(data: TOpenAccountData) {
  const { responseData } = await apiRequest('/api/auth/register', 'POST', data) as TApiRequest<TRequestResponse>;
  return responseData.message;
}

export async function signIn(data: TCredenditals) {
  const { responseData, accessToken } = await apiRequest('/api/auth/login', 'POST', data) as TApiRequest<TRequestResponse>;

  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
    return;
  }

  return responseData.message;
}

export async function logout() {
  const { responseData, accessToken } = await apiRequest('/api/auth/logout', 'POST', undefined, true) as TApiRequest<TRequestResponse>;
  if (!accessToken) return;

  localStorage.removeItem('access_token');
  return responseData.message;
}

export async function changePassword(data: TChangePassword) {
  const accessToken = verifyIfUserHasAccessToken();
  if (!accessToken) return;

  const decodedInfos = getDecodedAccessInfo(accessToken);
  if (!decodedInfos) return;

  const { responseData } = await apiRequest(
    `/api/auth/change-password/${decodedInfos.userId}`,
    'POST',
    data,
    true
  ) as TApiRequest<TRequestResponse>;

  return responseData.message;
}
