import { Button, Card, FormGroupLabel, FormGroupRoot, Input } from "fox-neo-design-system";
import { TransactionTypeField } from "./TransactionTypeField";

export function NewTransaction() {
    return (
        <Card.Root variant="outlined" className="w-full">
            <Card.Title size="lg" className="text-center text-lg">Nova transação</Card.Title>

            <form action="" className="flex flex-col gap-6">
               <TransactionTypeField  />

                <FormGroupRoot>
                    <FormGroupLabel>Valor</FormGroupLabel>
                    <Input defaultValue={0.00} />
                </FormGroupRoot>

                <FormGroupRoot>
                    <FormGroupLabel>Data</FormGroupLabel>
                    <Input type="date" placeholder="Selecione a data da transação"/>
                </FormGroupRoot>
                <Button size="sm">Inserir transacação</Button>
            </form>
        </Card.Root>
    )
}