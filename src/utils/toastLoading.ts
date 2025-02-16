import { toast } from "react-toastify"
import { debug } from "./debugFunction"

export const toastLoading = async () => {
    return new Promise<void>((resolve) => {

        const loadingToast = toast.loading("fazendo login...", {
            closeButton: false
        })
        debug("toast em execute")
        setTimeout(() => {
            toast.update(loadingToast, {
                render: "Bem vindo!",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })
            setTimeout(() => resolve(), 2000)
        }, 2000)
    })
}