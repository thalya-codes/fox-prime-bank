'use client'
import { Header } from "@/components/AccountPage/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ReactNode } from "react";
import { useAccountContext } from "../context/AccountContext";

export default function AccountLayout({ children }: { children: ReactNode }) {
    const { userName } = useAccountContext()

    return (
        <ProtectedRoute>
            <Header />
            <h2 className="text-title text-brand-800 font-semibold text-6xl my-20">Olá, {userName}!</h2>
            {children}
        </ProtectedRoute>
    )
}