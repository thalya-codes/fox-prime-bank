import { useQuery } from "@tanstack/react-query";
import { AccountContext } from "../context/AccountContext";
import { getUserName } from "../lib/user";
import { getUserAccount } from "../services/account";
import { ReactNode } from "react";
import { getAllUserTransactions } from "../services/transactions";

export  function AccountProvider({ children }: { children: ReactNode }) {
    const userName = getUserName()
    const userAccount= useQuery({
        queryKey: ['user-account'],
        queryFn: getUserAccount,
    });

    const transactions = useQuery({
        queryKey: ['user-transactions'],
        queryFn: getAllUserTransactions,
    });

    return (
        <AccountContext 
            value={{
                userName,
                userAccount,
                transactions,
            }}
        >
            {children}
        </AccountContext>
    )
}