'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './styles.module.scss'

export type BarDataProps = {
    post: string
    leitores: number
}[]

type ChartProps = {
    data: BarDataProps,
    title: string,
    slicer?: number
}

export default function BarGraphic({ data, title, slicer }: ChartProps) {
    const lastFiveData = data.slice(slicer ?? 0)

    return (

        <div className={styles.container}>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={lastFiveData}>
                    <XAxis dataKey="post" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leitores" fill="#8884d8" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            <div>
                <h2>{title}</h2>
            </div>
        </div>
    )
}