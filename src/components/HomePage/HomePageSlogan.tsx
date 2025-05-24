import { Button } from "fox-neo-design-system";

export function HomePageSlogan() {
    return (
        <div className="flex flex-col gap-7 text-center lg:text-start lg:gap-2 w-3/8">
            <h2 className="font-title text-[54px] leading-[52px] text-brand-800 font-medium lg:w-2/4">Transforme sua visão financeira.</h2>
            <h3 className="font-title text-brand-800 text-lg font-extralight">Viva a experiência do Banco Fox Prime</h3>
            <span><Button>Abrir conta</Button></span>
        </div>
    )
}