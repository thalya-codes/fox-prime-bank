'use client'

import { Button, FormGroupLabel, FormGroupRoot, Input, Modal } from "fox-neo-design-system";
import { TransactionTypeField } from "../AccountPage/TransactionTypeField";
import { TEditBankStatementModal } from "./types";

export function EditBankStatementModal({ 
    open, 
    name, 
    onClose, 
    setBeneficiaryName,
    onEditStatement
}: TEditBankStatementModal) {

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
                    defaultValue={'TRANSFER'} 
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
                <Button onClick={onEditStatement}>Salvar</Button>
            </Modal.Footer>
        </Modal.Root>
    )
}