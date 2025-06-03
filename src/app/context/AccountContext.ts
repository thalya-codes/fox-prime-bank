import { UseQueryResult } from "@tanstack/react-query";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TTransaction = {
    amount: number
    direction:'INCOMING'| 'OUTGOING'
    description?: string | null
    senderId: string
    senderName: string
    receiverId: string
    receiverName: string
    _id: string
    createdAt: string
}

export type TAccount = {
    userId: string
    accountNumber: string
    balance: number
}

export type TAccountContext = {
    transactions: UseQueryResult<TTransaction[]> | null;
    userName: string | null;
    userAccount: UseQueryResult<TAccount> | null;
    setShouldUpdateUserAccount?: Dispatch<SetStateAction<boolean | null>> | null
    setShouldUpdateUserTransactions?: Dispatch<SetStateAction<boolean | null>> | null
}

export const AccountContext = createContext<TAccountContext>({
    transactions: null,
    userName: null,
    userAccount: null
})

export function useAccountContext() {
    return useContext(AccountContext)
}