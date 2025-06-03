import { TApiRequest } from "@/app/lib/request";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface IMutations<T> {
    mutationFn:  (data: T) => Promise<TApiRequest>
    onSuccess: () => void,
    onError?: () => void
}

export function useMutations<T>({
    mutationFn,
    onSuccess,
    onError
}: IMutations<T>) {   
    return useMutation({
        mutationFn,
        onSuccess: (data: TApiRequest) => {
            if (String(data?.status).startsWith('4') || String(data?.status).startsWith('5')) {
                throw new Error(data.responseData.message || 'Falha ao executar operação');
            }

           if(onSuccess) onSuccess()
            toast('Operação realizada com sucesso!',{ type: "success" })
        },
         onError: (data) => {
            toast(data.message,{ type: "error" })
            if(onError) onError()
        }
    })
}