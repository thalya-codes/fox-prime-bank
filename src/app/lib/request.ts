import { verifyIfUserHasAccessToken } from "./localStorage";

export type TApiRequest = {
  responseData: { message?: string ,  accessToken?: string } 
  accessToken: string | null
  status: number
}

export async function apiRequest(
  endpoint: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  data?: unknown,
  auth: boolean = false
): Promise<TApiRequest | undefined> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  let accessToken: string | null = null;
  if (auth) {
    accessToken = verifyIfUserHasAccessToken();
    if (!accessToken) return;

    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(endpoint, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined
  });

  const responseData = await response.json();
  return { responseData, accessToken, status:  response.status};
}
