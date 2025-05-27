'use client'
import { useState } from "react";
import { Button } from "fox-neo-design-system";
import Image from "next/image";
import { HeaderCreditCard } from "./HeaderCreditCard";
import { HomePageSlogan } from "./HomePageSlogan";
import { OpenAccountModal } from "../Modals/OpenAccountModal";
import { LoginModal } from "../Modals/LoginAccountModal";

export function HomePageHeader() {
    const [openAccountModal, setOpenAccountModal] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState(false)

    return (
        <>
            <header>
                <div className="w-full flex justify-center lg:justify-between items-center mb-10 lg:mb-0">
                    <Image 
                        src="https://i.postimg.cc/gcLh6jMX/logo-fox-prime-bank.png" 
                        alt="Logo do banco"
                        width={150}
                        height={150}
                        className="hidden lg:block"
                    />
                    <nav>
                        <ul className="w-full flex gap-4">
                            <li><Button variant="link">Início</Button></li>
                            <li><Button variant="link" onClick={() => setOpenAccountModal(true)}>Abrir conta</Button></li>
                            <li><Button variant="outline" onClick={() => setOpenLoginModal(true)}>Acessar conta</Button></li>
                        </ul>
                    </nav>
                </div>

                <div className="flex flex-col   relative lg:flex-row lg:justify-between"> 
                    <HomePageSlogan onOpenAccountModal={() => setOpenAccountModal(true)}/>
                    <HeaderCreditCard />
                </div>
            </header>
            <OpenAccountModal open={openAccountModal} onClose={() => setOpenAccountModal(false)} />
            <LoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)}/>
        </>
    )
}