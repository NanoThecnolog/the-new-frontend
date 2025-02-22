import { DataProps, getTopEngagement } from '@/utils/utilities'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';

interface EngagementProps {
    data: DataProps[]
}

export default function Engagement({ data }: EngagementProps) {
    const [highEngagePost, setHighEngagePost] = useState<{ newsId: string, engagePercent: number } | null>(null)

    useEffect(() => {
        setHighEngagePost(getTopEngagement(data))
    }, [data])



    return (
        <div className={styles.container}>
            Post com maior engajamento: {highEngagePost && highEngagePost.newsId}
        </div>
    )
}