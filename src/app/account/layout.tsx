import { Header } from "@/components/AccountPage/Header";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <h2 className="text-title text-brand-800 font-semibold text-6xl my-20">Olá, Jonh!</h2>
            {children}
        </>
    )
}