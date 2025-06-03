import { useQuery } from "@tanstack/react-query";
import { AccountContext } from "../context/AccountContext";
import { getUserName } from "../lib/user";
import { getUserAccount } from "../services/account";
import { ReactNode } from "react";
import { getAllUserTransactions } from "../services/transactions";
import { usePathname } from "next/navigation";

export  function AccountProvider({ children }: { children: ReactNode }) {
    const isProtectedPage = usePathname().startsWith('/account')

    const userName = getUserName()
    const userAccount= useQuery({
        queryKey: ['user-account'],
        queryFn: getUserAccount,
        enabled: isProtectedPage
    });

    const transactions = useQuery({
        queryKey: ['user-transactions'],
        queryFn: getAllUserTransactions,
        enabled: isProtectedPage
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