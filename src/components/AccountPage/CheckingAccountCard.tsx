import Image from "next/image";
import EyeOffIcon from "@/assets/eye-off.svg";
import { CreditCard } from "fox-neo-design-system/dist/components/CreditCard/compositions";

export function CheckingAccountCard() {
    return (
        <CreditCard.Root className="flex flex-col gap-5 w-full xl:w-[471.75px]">
            <p className="font-title font-medium text-[32px] text-brand-950">Conta corrente</p>
           
            <hr className="w-full h-[1px] border-brand-950"/>

            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <p className="font-title font-medium text-[28px] text-brand-950">Saldo</p>
                    <p className="font-body font-medium text-2xl text-brand-950">R$ 30.000</p>
                </div>

                <button>
                    <Image src={EyeOffIcon} width={48} height={48} alt="Ocultar saldo"/>
                </button>
            </div>
        </CreditCard.Root>
    )
}