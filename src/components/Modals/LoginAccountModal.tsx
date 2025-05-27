import { Button, FormGroupLabel, FormGroupRoot, Input, Modal, TModal } from "fox-neo-design-system";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { TFormModalSharedProps } from "./types";

export function LoginModal({ open, onClose }: TModal) {
    const { register, reset, handleSubmit, clearErrors, formState:{ errors } } = useForm<TFormModalSharedProps>({
         defaultValues: {
            email: null,
            password: null,
        },
    })

    const onSubmit = (data: TFormModalSharedProps) => {
        console.log({data})
        reset()
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