import { getDecodedAccessInfo } from "@/app/lib/auth";
import { verifyIfUserHasAccessToken } from "@/app/lib/localStorage";

type TDepositAmountTransaction = {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  description?: string
  nature: "TRANSFER" 
}

export async function depositAmount(data: TDepositAmountTransaction) {
  const accessToken =  verifyIfUserHasAccessToken()
  if(!accessToken) return;

  const response = await fetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const responseData = await response.json()

  return responseData.message
}

export async function getAllUserTransactions() {
  const accessToken =  verifyIfUserHasAccessToken()
  if(!accessToken) return;

  const decodedInfos = getDecodedAccessInfo(accessToken)
  if(!decodedInfos) return;


  const response = await fetch(`/api/transactions/${decodedInfos.userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const responseData = await response.json()

  return responseData
}

export async function getOneUserTransaction(transactionId: string) {
  const accessToken =  verifyIfUserHasAccessToken()
  if(!accessToken) return;

  const decodedInfos = getDecodedAccessInfo(accessToken)
  if(!decodedInfos) return;


  const response = await fetch(`/api/transactions/${decodedInfos.userId}/${transactionId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const responseData = await response.json()

  return responseData
}

export async function deleteTransaction(transactionId: string) {
  const accessToken =  verifyIfUserHasAccessToken()
  if(!accessToken) return;

  const decodedInfos = getDecodedAccessInfo(accessToken)
  if(!decodedInfos) return;


  const response = await fetch(`/api/transactions/${decodedInfos.userId}/${transactionId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const responseData = await response.json()

  return responseData
}