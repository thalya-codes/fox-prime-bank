import { useForm } from "react-hook-form";
import { Button, Checkbox, FormGroupLabel, FormGroupRoot, Input, Modal, TModal } from "fox-neo-design-system";
import { ErrorMessage } from "../ErrorMessage";
import { TOpenAccountFormModal } from "./types";

export function OpenAccountModal({open, onClose}: TModal) {
    const { register, handleSubmit, clearErrors , formState:{ errors } , reset} = useForm<TOpenAccountFormModal>({
        defaultValues: {
            name: null,
            email: null,
            password: null,
            acceptTerm: null,
        },
    })

    const onSubmit = (data: TOpenAccountFormModal) => {
        console.log({data})
        reset()
        clearErrors()
        onClose()
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
                        {...register("name", { required: {value: true, message: "*Campo obrigatório"} })}
                    />
                    <ErrorMessage fieldName="name" errors={errors} />
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