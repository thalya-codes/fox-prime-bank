'use client'
import { Button, FormGroupLabel, FormGroupRoot, Input, Modal, TModal } from "fox-neo-design-system";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { TFormModalSharedProps } from "./types";
import { signIn, TCredenditals } from "@/app/services/auth";
import { useMutations } from "@/hooks/useMutations";
import { useRouter } from "next/navigation";
import { TApiRequest } from "@/app/lib/request";

export function LoginModal({ open, onClose }: TModal) {
    const { push } = useRouter()
    const { register, reset, handleSubmit, clearErrors, formState:{ errors } } = useForm<TFormModalSharedProps>({
         defaultValues: {
            email: undefined,
            password: undefined,
        },
    })


    const { mutateAsync , isPending} = useMutations<TCredenditals>({
        mutationFn: signIn as (data: TCredenditals) => Promise<TApiRequest>,
        onSuccess: () => { 
            push('/account')
            reset()
            clearErrors()
            onClose()
        }
    })

    if(isPending) return <h2>Carregand ...</h2>

    const onSubmit = async (data: TCredenditals) => {
        await mutateAsync(data)
    }

    const onCancel = () => {
        clearErrors()
        onClose()
    }


  return (
    <Modal.Root open={open} onClose={onCancel}>
        <Modal.Header
            onClose={onCancel}
            title="Acessar conta"
            variant="default"
        />

        <form onSubmit={(event) => event.preventDefault()}>
            <Modal.Body className="flex flex-col gap-8">
                <FormGroupRoot>
                    <FormGroupLabel htmlFor="field-1">Email</FormGroupLabel>
                    <Input 
                        type="email"
                        {...register("email", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName="email" errors={errors}/>
                </FormGroupRoot>

                <FormGroupRoot>
                    <FormGroupLabel htmlFor="field-1">Senha</FormGroupLabel>
                    <Input 
                        type="password"
                        {...register("password", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName="password" errors={errors}/>
                </FormGroupRoot>
            </Modal.Body>
        </form>

        <Modal.Footer>
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button onClick={handleSubmit(onSubmit)}>Entrar</Button>
        </Modal.Footer>
    </Modal.Root>
  )
}