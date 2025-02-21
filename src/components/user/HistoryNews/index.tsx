import { getDatePost } from '@/utils/dates'
import styles from './styles.module.scss'

interface HistoryProps {
    news: string[]
}
export default function History({ news }: HistoryProps) {
    const dates = getDatePost(news)
    const uniquePosts = [...new Set(dates)]
    return (
        <div className={styles.container}>
            <div>
                <h4>Histórico</h4>
            </div>
            <div className={styles.datesContainer}>
                {uniquePosts.map((news, index) =>
                    <div key={index} className={styles.dates}>
                        <p>{news} - titulo-newsletter</p>
                    </div>
                )}
            </div>

        </div>
    )
}