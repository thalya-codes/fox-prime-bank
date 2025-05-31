'use client'
import "../globals.css"
import { CheckingAccountCard } from "@/components/AccountPage/CheckingAccountCard";
import { NewTransaction } from "@/components/AccountPage/NewTransaction";
import { BankStatements } from "@/components/AccountPage/BankStatements";

export default function Home() {
    return (
        <section className="h-full overflow-auto">

            <div className="flex justify-between flex-col gap-8 xl:flex-row">
                <div className="flex flex-col gap-12">
                    <CheckingAccountCard />
                    <NewTransaction />
                </div>

                <BankStatements />
            </div>
        </section>
    )
}