import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import BarGraphic from '@/components/ui/BarGraphic'
import { DataProps, getPostTotalVisits } from '@/utils/utilities'

interface GraphicVisitsProps {
    data: DataProps[]
}

interface VisitsProps {
    post: string,
    leitores: number
}

export default function GraphicVisits({ data }: GraphicVisitsProps) {
    const [visits, setVisits] = useState<VisitsProps[]>([])

    useEffect(() => {
        setVisits(getPostTotalVisits(data))
    }, [data])

    return (
        <>
            <BarGraphic data={visits} title='Visualizações por posts' />
        </>
    )
}