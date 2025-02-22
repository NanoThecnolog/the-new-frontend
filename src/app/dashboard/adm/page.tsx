'use client'
import RankingCard from '@/components/user/RankingCard'
import styles from './styles.module.scss'
import { api } from '@/utils/api'
import { DataProps, groupedData, transformData } from '@/utils/utilities'
import { useCallback, useEffect, useState } from 'react'
import { debug } from '@/utils/debugFunction'
import BarGraphic from '@/components/ui/BarGraphic'
import Engagement from '@/components/adm/EngagePerCent'
import GraphicVisits from '@/components/adm/GraphicPerVisit'
import GraphicPerDay from '@/components/adm/GraphicPerDay'

interface DataPostsProps {
    post: string,
    leitores: number
}

export default function ADM() {
    const [loading, setLoading] = useState(false)
    const [dbData, setDbData] = useState<DataProps[]>([])
    const [dataPosts, setDataPosts] = useState<DataPostsProps[]>([])
    //debug('dbData', dbData)

    const getDataDB = useCallback(async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.get('/user/list', {
                params: {
                    pageSize: 1000
                }
            })
            const data: DataProps[] = response.data.data
            setDbData(data)
            getDataPosts(data)

        } catch (err) {
            console.log("Erro durante a requisição", err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getDataDB()
    }, [getDataDB])


    function getDataPosts(data: DataProps[]) {
        const arr: { email: string, req_id: string }[] = []
        data.map(item => {
            const { email, req_id } = item
            const obj = {
                email,
                req_id
            }
            arr.push(obj)
        })
        //debug(arr)
        const teste = groupedData(arr)
        const transformed = transformData(teste)
        debug(transformed)
        setDataPosts(transformed)
    }




    return (
        <main className={styles.container}>
            <h1 className={styles.text}>hello, Adm!</h1>
            <GraphicPerDay data={dataPosts} />
            <GraphicVisits data={dbData} />
            <div className={styles.segundoContainer}>
                <RankingCard />
                <Engagement data={dbData} />
            </div>

            <div>
                O que eu preciso ter aqui?
                <ul>
                    <li>ranking - check</li>
                    <li>grafico com os 5 ultimos posts e quantos usuários visualizaram cada post - check</li>
                    <li>painel com numeros (quantidades de newsletter, usuários, etc)</li>
                    <li>
                        Filtro de estatísticas por:
                        newsletter
                        período de tempo
                        status do streak
                    </li>
                </ul>
            </div>
        </main>
    )
}

//colocar um painel com a quantidade de newsletters lançadas, quantidade de visitantes
//mostrar um ranking das newsLetters com base na quantidade de visitantes.
//mostrar a newsletter com maior engajamento em porcentagem (somar a quantidade de usuários e comparar com a quantidade de visitantes da newsletter e retornar o valor em porcentagem)