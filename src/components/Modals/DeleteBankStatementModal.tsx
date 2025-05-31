import { Button, Modal, TModal } from "fox-neo-design-system";

export function DeleteBankStatementModal({ open, onClose }: TModal) {
    return (
        <Modal.Root open={open} onClose={onClose} >
            <Modal.Header variant="danger" title="Excluir extrato" onClose={onClose}/>
            <Modal.Body className="flex flex-col gap-10">
                <p className="text-body font-body font-semibold text-sm leading-9 text-center">Tem certeza que deseja excluir este extrato?</p>
                <div className="flex justify-center gap-6">
                    <Button variant="danger" onClick={onClose}>Sim</Button>
                    <Button variant="outline" onClick={onClose}>Não</Button>
                </div>
            </Modal.Body>
        </Modal.Root>
    )
}