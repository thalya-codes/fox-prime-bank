import { verifyIfUserHasAccessToken } from "./localStorage";

export type TApiRequest<T> = {
  responseData: T 
  accessToken: string | null
}

export async function apiRequest<T>(
  endpoint: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  data?: unknown,
  auth: boolean = false
): Promise<TApiRequest<T> | undefined> {
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
  return { responseData, accessToken };
}
