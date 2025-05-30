'use client'
import Image from "next/image";
import { Button, Card, Input } from "fox-neo-design-system"
import MagnifyingGlassIcon from "@/assets/magnifying-glass.svg";    
import TrashBinIcon from "@/assets/trash-bin.svg";    
import EditIcon from "@/assets/edit.svg";    
import { useState } from "react";
import { EditBankStatementModal } from "../Modals/EditBankStatementModal";
import { DeleteBankStatementModal } from "../Modals/DeleteBankStatementModal";

export function BankStatements() {
    const [openEdiTransactionModal, setOpenEdiTransactionModal] = useState(false);
    const [openDeleteTransactionModal, setOpenDeleteTransactionModal] = useState(false);
    const [beneficiaryName, setBeneficiaryName] = useState<string>('');

    const transactions = [
        {   
            id: 10,
            name: 'Floricultura Mary Fernades S.A',
            amount: '96,55',
            date: '2025-05-28T00:00:00.000Z'
        },
        {
            id: 11,
            name: 'Beleza na Web',
            amount: '96,55',
            date: '2025-05-28T00:00:00.000Z'
        },
        {
            id: 12,
            name: 'Amazon',
            amount: '96,55',
            date: '2025-05-28T00:00:00.000Z'
        },
    ]

  return  (
        <>
            <Card.Root variant="outlined" className="flex flex-col gap-7 xl:w-5/12">
                <Card.Title className="text-brand-800 text-center" size='lg'>Extratos</Card.Title>
                <div className="flex justify-between gap-3">
                    <Input className="w-full" placeholder="Buscar transação"/>
                    <Button>
                        <Image 
                            src={MagnifyingGlassIcon} 
                            width={30} 
                            height={30} 
                            alt="Pesquisar" 
                        />
                    </Button>
                </div>

                <ul className="flex flex-col gap-6">
                    {transactions?.map((item) => (
                        <Card.Root key={item.id}>
                            <div className="flex justify-between">
                                <Card.Title className="text-brand-800">Transferência</Card.Title>

                                <div className="flex gap-2">
                                    <button onClick={() => {
                                        setBeneficiaryName(item.name)
                                        setOpenEdiTransactionModal(true)
                                    }}>
                                        <Image src={EditIcon} alt="V" width={20}/>
                                    </button>
                                
                                    <button  onClick={() => setOpenDeleteTransactionModal(true)}>
                                        <Image 
                                            src={TrashBinIcon} 
                                            alt="Deletar transação" 
                                            width={20}
                                        />
                                    </button>
                                </div>
                            </div>

                            <Card.Paragraph>{item.name}</Card.Paragraph>

                            <div className="flex justify-between">
                                <Card.Paragraph>R$ {item.amount}</Card.Paragraph>
                                <Card.Paragraph>{new Date(item.date).toLocaleDateString('br')}</Card.Paragraph>
                            </div>
                        </Card.Root>
                    ))}
                </ul>
                <Button>Carregar mais</Button>
            </Card.Root>

            <EditBankStatementModal 
                name={beneficiaryName || ''}
                open={openEdiTransactionModal} 
                onClose={() => setOpenEdiTransactionModal(false)}
                setBeneficiaryName={setBeneficiaryName}
            />

            <DeleteBankStatementModal 
                open={openDeleteTransactionModal} 
                onClose={() => setOpenDeleteTransactionModal(false)}
            />
        </>
    )
}