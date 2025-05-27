import { FieldErrors } from "react-hook-form"
import { TFormModalSharedProps, TOpenAccountFormModal } from "../Modals/types"

export type TErrorMessage = {
    errors: FieldErrors<TFormModalSharedProps> | FieldErrors<TOpenAccountFormModal>
    fieldName: any
}