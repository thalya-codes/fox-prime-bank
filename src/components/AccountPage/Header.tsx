'use client'
import { Avatar, Button, Dropdown } from "fox-neo-design-system";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from '@/assets/chevron-left-arrow.svg';
import Image from "next/image";

export function Header() {
    const { back , push } = useRouter()
    const userProfileMenu  = [
        { text: "Configurações", onClick: () => push('/account/configuration') },
        { text: "Sair", onClick: () => console.log("click sair") },
    ];

    return (
        <header className="flex justify-center items-center gap-7">
            <Button variant="link" onClick={() => back()}>
                <Image 
                    src={ChevronLeftIcon}
                    alt="Ícone seta virada para esquerda"
                    width={20}
                />
                <span>Voltar</span>
            </Button>

            <div className="flex justify-end w-full">
                <Dropdown items={userProfileMenu}>
                    <Avatar 
                        name="Thalya Stéffany"
                        size="sm"
                    />
                </Dropdown>
            </div>
        </header>
    )
}