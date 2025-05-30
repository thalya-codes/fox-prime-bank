import { TModal } from "fox-neo-design-system";
import { Dispatch, SetStateAction } from "react";

export type TFormModalSharedProps = {
    email: string | null;
    password: string | null;
}

export type TOpenAccountFormModal = {
    name: string | null
    acceptTerm: boolean| null
} & TFormModalSharedProps


export type TEditBankStatementModal = {
    transactionType?: 0 | 1 | 2
    name: string
    setBeneficiaryName: Dispatch<SetStateAction<string>>
} & TModal