import { scheduleTokenRefresh } from "@/app/lib/auth";
import { verifyIfUserHasAccessToken } from "@/app/lib/localStorage";
import { refreshAccessToken } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { push } = useRouter()
    const accessToken = verifyIfUserHasAccessToken()

    useEffect(() => {
        if(!accessToken) {
            push('/')
         }  else {
            scheduleTokenRefresh(accessToken, refreshAccessToken);
        }
    }, [accessToken, push])

    return children
}