'use client'

import { Button, FormGroupLabel, FormGroupRoot, Input, Modal } from "fox-neo-design-system";
import { TransactionTypeField } from "../AccountPage/TransactionTypeField";
import { TEditBankStatementModal } from "./types";
import { useState } from "react";
import { TTransactionTypeFieldValues } from "../AccountPage/types";

export function EditBankStatementModal({ 
    open, 
    name, 
    transactionType, 
    onClose, 
    setBeneficiaryName
}: TEditBankStatementModal) {
    const [transactionTypeValue, setTransactionTypeValue] = useState<TTransactionTypeFieldValues | undefined>(transactionType)

    return (
        <Modal.Root open={open} onClose={onClose}>
            <Modal.Header title="Editar extrato" onClose={onClose}/>
            <Modal.Body className="flex flex-col gap-10">
                <FormGroupRoot>
                    <FormGroupLabel>Nome</FormGroupLabel>
                    <Input 
                        value={name} 
                        onChange={({target: {value}}) => setBeneficiaryName(value)}
                    />
                </FormGroupRoot>

                <TransactionTypeField 
                    defaultValue={transactionTypeValue} 
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
                <Button onClick={onClose}>Salvar</Button>
            </Modal.Footer>
        </Modal.Root>
    )
}