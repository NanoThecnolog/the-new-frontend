'use client'
import { ContextProps, ContextProviderProps } from "@/types/Context";
import { UserData, UserProps } from "@/types/User";
import { api } from "@/utils/api";
import { debug } from "@/utils/debugFunction";
import { toastLoading } from "@/utils/toastLoading";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const NewContext = createContext({} as ContextProps)

export function NewProvider({ children }: ContextProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null)
    const router = useRouter()



    async function signIn(email: string) {
        try {
            //setUser([])
            const response = await api.get('/user/detail', {
                params: {
                    email
                }
            })
            const data: UserData[] = response.data.data
            const obj: UserProps = {
                email: data[0].email,
                newsLetters: data ? data.map(news => news.req_id) : []
            }
            setUser(obj)
            debug("ligando o toast")
            document.body.style.cursor = 'wait'
            await toastLoading()
            debug('parte pra redirecionar...')
            document.body.style.cursor = 'default'
            router.push('/dashboard/user')
        } catch (err) {
            console.log(err)
            toast.error("Email não encontrado, confirme seu email e tente novamente!")
        }
    }

    return (
        <NewContext.Provider value={{ user, setUser, signIn }}>
            {children}
        </NewContext.Provider>
    )
}

export function useTheNewContext() {
    return useContext(NewContext)
}