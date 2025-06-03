import {  Dispatch, SetStateAction } from "react"
export type TTransactionTypeFieldValues = 'TRANSFER'

export type TTransactionTypeField = {
    defaultValue?: TTransactionTypeFieldValues
    onChange?: Dispatch<SetStateAction<TTransactionTypeFieldValues | undefined>> 
    disabled?: boolean
}