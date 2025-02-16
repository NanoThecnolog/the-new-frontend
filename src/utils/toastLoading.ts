import { toast } from "react-toastify"

export const toastLoading = () => {
    const loadingToast = toast.loading("fazendo login...", {
        closeButton: true
    })
    setTimeout(() => {
        toast.update(loadingToast, {
            render: "Bem vindo!",
            type: "success",
            isLoading: false,
            autoClose: 3000
        })
    }, 2000)
}