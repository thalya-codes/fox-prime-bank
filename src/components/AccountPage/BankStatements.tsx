'use client'
import Image from "next/image";
import { Card } from "fox-neo-design-system"
import TrashBinIcon from "@/assets/trash-bin.svg";    
import EditIcon from "@/assets/edit.svg";    
import { useState } from "react";
import { EditBankStatementModal } from "../Modals/EditBankStatementModal";
import { DeleteBankStatementModal } from "../Modals/DeleteBankStatementModal";
import { useAccountContext } from "@/app/context/AccountContext";
import { useMutations } from "@/hooks/useMutations";
import { deleteTransaction, editTransaction } from "@/app/services/transactions";

export function BankStatements() {
    const [openEdiTransactionModal, setOpenEdiTransactionModal] = useState(false);
    const [openDeleteTransactionModal, setOpenDeleteTransactionModal] = useState(false);
    const [beneficiaryName, setBeneficiaryName] = useState<string>('');
    const [transactionId, setTransactionId] = useState<null |string>(null)
    const { transactions }  = useAccountContext()
    const { mutateAsync: mutateDeleteTransaction } = useMutations({
        mutationFn: deleteTransaction,
        onSuccess: async () => {
            setOpenDeleteTransactionModal(false)
        }
    })

     const { mutateAsync: mutateEditTransaction } = useMutations({
        mutationFn: editTransaction,
        onSuccess: async () => {
            setOpenEdiTransactionModal(false)
        }
    })

    const onConfirmStatementDeletation = async () => {
        await mutateDeleteTransaction(transactionId!)
        await transactions?.refetch()
    }

    const onEditStatement = async () => {
        await mutateEditTransaction({transactionId, receiverName: beneficiaryName})
        await transactions?.refetch()
    }


  return  (
        <>
            <Card.Root variant="outlined" className="flex flex-col gap-7 xl:w-5/12 overflow-auto h-max">
                <Card.Title className="text-brand-800 text-center" size='lg'>Extratos</Card.Title>
                <ul className="flex flex-col gap-6 h-full">
                    {(transactions?.data?.length === 0 || !transactions?.data) ? <p className=" w-full justify-center font-title text-md text-brand-700 text-center">Você ainda não possui nenhum extrato</p>: transactions?.data?.map((item) => (
                        <Card.Root key={item._id}>
                            <div className="flex justify-between">
                                <Card.Title className="text-brand-800">Transferência</Card.Title>

                                <div className="flex gap-2">
                                    <button onClick={() => {
                                        setTransactionId(item._id)

                                        setBeneficiaryName(item.receiverName)
                                        setOpenEdiTransactionModal(true)
                                    }}>
                                        <Image src={EditIcon} alt="V" width={20}/>
                                    </button>
                                
                                    <button  
                                        onClick={() => {
                                            setTransactionId(item._id)
                                            setOpenDeleteTransactionModal(true)
                                        }}
                                    >
                                        <Image 
                                            src={TrashBinIcon} 
                                            alt="Deletar transação" 
                                            width={20}
                                        />
                                    </button>
                                </div>
                            </div>

                            <Card.Paragraph>{item.receiverName}</Card.Paragraph>

                            <div className="flex justify-between">
                                <Card.Paragraph>R$ {item.amount}</Card.Paragraph>
                                <Card.Paragraph>{new Date(item.createdAt).toLocaleDateString('br')}</Card.Paragraph>
                            </div>
                        </Card.Root>
                    ))}
                </ul>
            </Card.Root>

            <EditBankStatementModal 
                name={beneficiaryName || ''}
                open={openEdiTransactionModal} 
                onClose={() => setOpenEdiTransactionModal(false)}
                setBeneficiaryName={setBeneficiaryName}
                onEditStatement={onEditStatement}
            />

            <DeleteBankStatementModal 
                open={openDeleteTransactionModal} 
                onClose={() => setOpenDeleteTransactionModal(false)}
                onConfirmStatementDeletation={onConfirmStatementDeletation}
            />
        </>
    )
}