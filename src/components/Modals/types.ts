export type TFormModalSharedProps = {
    email: string | null;
    password: string | null;
}

export type TOpenAccountFormModal = {
    name: string | null
    acceptTerm: boolean| null
} & TFormModalSharedProps