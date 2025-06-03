'use client'
import { Avatar, Button, Dropdown } from "fox-neo-design-system";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from '@/assets/chevron-left-arrow.svg';
import Image from "next/image";
import { useAccountContext } from "@/app/context/AccountContext";
import { useMutations } from "@/hooks/useMutations";
import { logout } from "@/app/services/auth";

export function Header() {
    const { back , push } = useRouter()
    const { userName } = useAccountContext()
    const { mutateAsync } = useMutations({
        mutationFn: logout,
        onSuccess: () => push('/')
    })
    const userProfileMenu  = [
        { text: "Configurações", onClick: () => push('/account/configuration') },
        { 
            text: "Sair", 
            onClick: () => {
                mutateAsync()
            } 
        },
    ];

    return (
        <header className="flex justify-center items-center gap-7">
            <Button variant="link" onClick={() => back()}>
                <p className="flex gap-2">
                    <Image 
                        src={ChevronLeftIcon}
                        alt="Ícone seta virada para esquerda"
                        width={20}
                    />
                    <span>Voltar</span>
                </p>
            </Button>

            <div className="flex justify-end w-full">
                <Dropdown items={userProfileMenu}>
                    <Avatar 
                        name={userName!}
                        size="sm"
                    />
                </Dropdown>
            </div>
        </header>
    )
}