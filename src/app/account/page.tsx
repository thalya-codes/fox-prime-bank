'use client'
import "../globals.css"
import { Header } from "@/components/AccountPage/Header";
import { CheckingAccountCard } from "@/components/AccountPage/CheckingAccountCard";
import { NewTransaction } from "@/components/AccountPage/NewTransaction";
import { BankStatements } from "@/components/AccountPage/BankStatements";

export default function Home() {
    return (
        <>
           <Header />
           <section className="h-full overflow-auto">
                <h2 className="text-title text-brand-800 font-semibold text-6xl my-20">Olá, Jonh!</h2>

                <div className="flex justify-between flex-col gap-8 xl:flex-row">
                    <div className="flex flex-col gap-12">
                        <CheckingAccountCard />
                        <NewTransaction />
                    </div>

                    <BankStatements />
                </div>
           </section>
        </>
    )
}