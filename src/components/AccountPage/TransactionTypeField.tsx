'use client'

import { FormGroupLabel, FormGroupRoot, Select } from "fox-neo-design-system";
import { TTransactionTypeField } from "./types";

export function TransactionTypeField({ defaultValue , disabled }: TTransactionTypeField) {
    const transationOption = [
        { label: 'Transferência', value: 'TRANSFER' },
    ]

    return (
        <FormGroupRoot>
            <FormGroupLabel>Tipo de transação</FormGroupLabel>
            <Select 
                defaultValue={transationOption[0].value || defaultValue} 
                options={transationOption} 
                placeholder="Selecione o tipo de transação"
                disabled={disabled}
            />
        </FormGroupRoot>
    )
}