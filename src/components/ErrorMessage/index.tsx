import { FormGroupMessage } from "fox-neo-design-system";
import { TErrorMessage } from "./types";

export function ErrorMessage({ fieldName, errors }: TErrorMessage) {
    const fieldError = errors[fieldName]
    return fieldError && <FormGroupMessage type={'error'}>{fieldError.message}</FormGroupMessage>
}