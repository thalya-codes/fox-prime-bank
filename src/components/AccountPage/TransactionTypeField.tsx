'use client'

import { FormGroupLabel, FormGroupRoot, Select } from "fox-neo-design-system";
import { TTransactionTypeField } from "./types";

export function TransactionTypeField({ defaultValue }: TTransactionTypeField) {
    const transationOption = [
        { label: 'Câmbio de Moeda', value: '0' },
        { label: "DOC/TED", value: '1' },
        { label: "Empréstimo e Financiamento", value: '2' }
    ]

    return (
        <FormGroupRoot>
            <FormGroupLabel>Tipo de transação</FormGroupLabel>
            <Select 
                defaultValue={defaultValue} 
                options={transationOption} 
                placeholder="Selecione o tipo de transação"
            />
        </FormGroupRoot>
    )
}