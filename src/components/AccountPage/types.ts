import {  Dispatch, SetStateAction } from "react"
export type TTransactionTypeFieldValues = 0 | 1 | 2

export type TTransactionTypeField = {
    defaultValue?: TTransactionTypeFieldValues
    onChange?: Dispatch<SetStateAction<TTransactionTypeFieldValues | undefined>> 
}