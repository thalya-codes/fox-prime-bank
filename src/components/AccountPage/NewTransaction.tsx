import { Button, Card, FormGroupLabel, FormGroupRoot, Input } from "fox-neo-design-system";
import { TransactionTypeField } from "./TransactionTypeField";
import { depositAmount } from "@/app/services/transactions";
import { useMutations } from "@/hooks/useMutations";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { useAccountContext } from "@/app/context/AccountContext";

type TNewTranscationForm = {
    receiverAccount: string | null
    amount: number | null
    description?: string | null
}

export function NewTransaction() {
    const { userAccount , transactions } = useAccountContext()
    const { mutateAsync } = useMutations({
        mutationFn: depositAmount,
        onSuccess: () => {}
    })

    const { register, reset, handleSubmit, formState:{ errors } } = useForm<TNewTranscationForm>({
        defaultValues: {
            receiverAccount: null,
            amount: 0,
            description: null,
        },
    })

    const onSubmit = async (data: TNewTranscationForm) => {       
        const payload = {
            fromAccountNumber: userAccount?.data?.accountNumber as string,
            toAccountNumber: data.receiverAccount as string,
            nature: "TRANSFER" as 'TRANSFER',
            description:  data?.description || '',
            amount: Number(data.amount) as number
        }

        await mutateAsync(payload)
        await userAccount?.refetch()
        await transactions?.refetch()
         reset()

    }
    

    return (
        <Card.Root variant="outlined" className="w-full">
            <Card.Title size="lg" className="text-center text-lg">Nova transação</Card.Title>

            <form 
                className="flex flex-col gap-6" 
                onSubmit={(event) => event.preventDefault()}
            >
                 <FormGroupRoot>
                    <FormGroupLabel>Destinário</FormGroupLabel>
                    <Input  
                        {...register("receiverAccount", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName="receiverAccount" errors={errors} />
                </FormGroupRoot>

               <TransactionTypeField disabled />

                <FormGroupRoot>
                    <FormGroupLabel>Valor</FormGroupLabel>
                    <Input 
                        defaultValue={0.00} 
                        {...register("amount", { validate: (value) => value! > 0 || "*Campo obrigatório"})}

                    />
                    <ErrorMessage fieldName="amount" errors={errors} />
                </FormGroupRoot>



                <FormGroupRoot>
                    <FormGroupLabel>Mensagem</FormGroupLabel>
                    <Input 
                        {...register("description")}
                    />
                </FormGroupRoot>
                <Button 
                    size="sm"
                    onClick={handleSubmit(onSubmit)}
                >Inserir transacação</Button>
            </form>
        </Card.Root>
    )
}