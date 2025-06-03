'use client'
import { changePassword } from "@/app/services/auth";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useMutations } from "@/hooks/useMutations";
import {  } from "@tanstack/react-query";
import { Button, Card, FormGroupLabel, FormGroupRoot, Input } from "fox-neo-design-system";
import { useForm } from "react-hook-form";

export default function AccountConfiguration() {
    const { mutateAsync } = useMutations({
        mutationFn: changePassword as any,
        onSuccess: () => {}
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            currentPassword: null,
            newPassword: null 
        }
    })

    const onSubmit = async (data) => {
        await mutateAsync(data)
        reset()
    }

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <Card.Root variant="outlined">
                <Card.Title size="lg" className="text-center">Minha conta</Card.Title>
                <FormGroupRoot>
                    <FormGroupLabel>Senha atual</FormGroupLabel>
                    <Input 
                        type="password" 
                        {...register("currentPassword", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName='currentPassword' errors={errors}/>
                </FormGroupRoot>

                <FormGroupRoot>
                    <FormGroupLabel>Nova senha</FormGroupLabel>
                    <Input 
                        type="password" 
                        {...register("newPassword", { required: {value: true, message: "*Campo obrigatório"} })}
                    />   
                    <ErrorMessage fieldName='newPassword' errors={errors}/>
        
                    </FormGroupRoot>
                <Button onClick={handleSubmit(onSubmit)}>Salvar alterações</Button>
            </Card.Root>
        </form>
    )
}