import { getDecodedAccessInfo } from "@/app/lib/auth";
import { verifyIfUserHasAccessToken } from "@/app/lib/localStorage";

export async function getUserBalance() {
  const accessToken =  verifyIfUserHasAccessToken()
  if(!accessToken) return;

  const decodedInfos = getDecodedAccessInfo(accessToken)
  if(!decodedInfos) return;


  const response = await fetch(`/api/account/${decodedInfos.userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const responseData = await response.json()

  return responseData.message || responseData.balance
}