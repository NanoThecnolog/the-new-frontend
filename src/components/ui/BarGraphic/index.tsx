'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type DataProps = {
    post: string
    visitors: number
}[]

type ChartProps = {
    data: DataProps
}

export default function BarGraphic({ data }: ChartProps) {
    const lastFiveData = data.slice(-5)

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lastFiveData}>
                <XAxis dataKey="post" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}