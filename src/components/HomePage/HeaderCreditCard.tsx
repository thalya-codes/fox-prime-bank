import { CreditCard } from "fox-neo-design-system/dist/components/CreditCard/compositions";

export function HeaderCreditCard() {
    return (
       
        <div className="animate-float h-85">
            <CreditCard.Root type="basic" className="w-[90%] right-[5%] h-70  shadow-2xl preserve-3d rotate-basic-credit-card absolute z-20 sm:w-[60%] sm:right-[15%] lg:w-credit-card lg:right-[30%] lg:right-2">
                <CreditCard.Header />
                <CreditCard.Body
                    cardNumber={[1111, 1111, 1111, 1111]}
                    userFullName="Jonh Doe"
                    validity="00/00"
                    className="text-base font-thin"
                />
            </CreditCard.Root>

            <CreditCard.Root type="black" className="w-[90%] right-[5%] h-50 preserve-3d absolute sm:w-[60%] sm:right-[15%] lg:w-credit-card lg:right-[30%] bottom-2 rotate-black-credit-card lg:right-2">
                <CreditCard.Header />
                <CreditCard.Body
                    cardNumber={[1111, 1111, 1111, 1111]}
                    userFullName="Jonh Doe"
                    validity="00/00"
                    className="text-base font-thin"
                />
            </CreditCard.Root>
        </div>
    )
}