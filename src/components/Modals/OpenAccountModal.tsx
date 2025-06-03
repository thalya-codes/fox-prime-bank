import { useForm } from "react-hook-form";
import { Button, Checkbox, FormGroupLabel, FormGroupRoot, Input, Modal } from "fox-neo-design-system";
import { ErrorMessage } from "../ErrorMessage";
import { openAccount, TOpenAccountData } from "@/app/services/auth";
import { TOpenAccountModal } from "fox-neo-design-system/dist/components/Modal/types";
import { useMutations } from "@/hooks/useMutations";

export function OpenAccountModal({open, onClose, onOpenLoginModal}: TOpenAccountModal) {
    const { register, handleSubmit, clearErrors , formState:{ errors } , reset} = useForm<TOpenAccountData>({
        defaultValues: {
            fullName: undefined,
            email: undefined,
            birthDate: undefined,
            password: undefined,
            acceptTerm: undefined,
        },
    })

    const { mutateAsync , isPending} = useMutations({
        mutationFn: openAccount,
        onSuccess: () => {    
            reset()
            clearErrors()
            onClose()
            
            setTimeout(() => {
                onOpenLoginModal()
            }, 300);
    
        }
    })


    if(isPending) return <h1>Carregando...</h1>

    const onSubmit = async (data: TOpenAccountData) => {
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
            title="Abrir conta corrente"
            variant="default"
        />

        <form onSubmit={(event) => event.preventDefault()}>
            <Modal.Body className="flex flex-col gap-8">
                <FormGroupRoot>
                    <FormGroupLabel htmlFor="field-1">Nome</FormGroupLabel>
                    <Input 
                        {...register("fullName", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName="fullName" errors={errors} />
                </FormGroupRoot>

                <FormGroupRoot>
                    <FormGroupLabel htmlFor="field-1">Data de nascimento</FormGroupLabel>
                    <Input 
                        type="date"
                        {...register("birthDate", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName="birthDate" errors={errors} />
                </FormGroupRoot>

                <FormGroupRoot> 
                    <FormGroupLabel htmlFor="field-1">Email</FormGroupLabel>
                    <Input 
                        type="email"
                        {...register("email", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName="email" errors={errors} />
                </FormGroupRoot>

                <FormGroupRoot>
                    <FormGroupLabel htmlFor="field-1">Senha</FormGroupLabel>
                    <Input type="password"
                        {...register("password", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName="password" errors={errors} />
                </FormGroupRoot>

                <Checkbox.Root>
                    <Checkbox.Container>
                        <Checkbox.Field 
                            id="2"  
                            {...register("acceptTerm", { required: {value: true, message: "*Campo obrigatório"} })}
                        />
                        <Checkbox.Label htmlFor="2">
                            Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.
                        </Checkbox.Label>
                    </Checkbox.Container>

                    <ErrorMessage fieldName="acceptTerm" errors={errors} />
                </Checkbox.Root>
            </Modal.Body>
        </form>

        <Modal.Footer>
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button onClick={handleSubmit(onSubmit)}>Criar conta</Button>
        </Modal.Footer>
    </Modal.Root>
  )
}