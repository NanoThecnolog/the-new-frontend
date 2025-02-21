'use client'
import RankingCard from '@/components/user/RankingCard'
import styles from './styles.module.scss'
import BarGraphic from '@/components/ui/BarGraphic'
import { api } from '@/utils/api'
import { DataProps } from '@/utils/utilities'
import { useEffect, useState } from 'react'
import { debug } from '@/utils/debugFunction'

export default function ADM() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDataDB()
    }, [])

    async function getDataDB() {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get('/user/list', {
                params: {
                    pageSize: 1000
                }
            })
            const data: DataProps[] = response.data.data

            let arr: { email: string, req_id: string }[] = []
            data.map(item => {
                const { email, req_id } = item
                const obj = {
                    email,
                    req_id
                }
                arr.push(obj)
            })
            debug(arr)

        } catch (err) {
            console.log("Erro durante a requisição", err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <main className={styles.container}>
            <h1 className={styles.text}>hello, Adm!</h1>
            <RankingCard />
            {
                //<BarGraphic data={}/>
            }
            <div>
                O que eu preciso ter aqui?
                <ul>
                    <li>ranking - check</li>
                    <li>grafico com os 5 ultimos posts e quantos usuários visualizaram cada post</li>
                    <li>Criar streak para newsLetters com o máximo de acessos em cada newsletter</li>
                    <li>Filtro de estatísticas por newsletter, período de tempo e streak da news</li>
                </ul>
            </div>
        </main>
    )
}