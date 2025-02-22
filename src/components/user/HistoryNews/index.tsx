import { getDatePost, localDate } from '@/utils/dates'
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
                {uniquePosts.map((news, index) => {
                    const date = localDate(news)
                    if (!isNaN(date.getTime()) && date.getDay() !== 0) {
                        return (
                            <div key={index} className={styles.dates}>
                                <p>{news} - titulo-newsletter</p>
                            </div>
                        )
                    }
                    return null
                }
                )}
            </div>

        </div>
    )
}