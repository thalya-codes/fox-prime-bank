import { Button, Card, FormGroupLabel, FormGroupRoot, Input } from "fox-neo-design-system";

export default function AccountConfiguration() {
    return (
        <Card.Root variant="outlined">
            <Card.Title size="lg" className="text-center">Minha conta</Card.Title>
            <FormGroupRoot>
                <FormGroupLabel>Nome</FormGroupLabel>
                <Input />
            </FormGroupRoot>

            <FormGroupRoot>
                <FormGroupLabel>Senha</FormGroupLabel>
                <Input type="password"/>
            </FormGroupRoot>
            <Button>Salvar alterações</Button>
        </Card.Root>
    )
}