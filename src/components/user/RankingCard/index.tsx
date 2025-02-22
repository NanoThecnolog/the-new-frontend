import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { api } from '@/utils/api'
import { debug } from '@/utils/debugFunction'
import { DataProps, groupedData } from '@/utils/utilities'
import { FaStar } from 'react-icons/fa'
import { calculateStreak } from '@/utils/Gamefication'

type RankProps = {
    email: string
    posts: string[]
}

export default function RankingCard() {
    const [loading, setLoading] = useState(false)
    const [ranking, setRanking] = useState<RankProps[]>([])
    useEffect(() => {
        const getRanking = async () => {
            if (loading) return
            setLoading(true)
            try {
                const response = await api.get('/user/list', {
                    params: {
                        pageSize: 1000
                    }
                })
                const data: DataProps[] = response.data.data
                const agrupados = groupedData(data)
                //const datePosts = agrupados.map((item) => getData)
                const sorted = [...agrupados].sort((a, b) => b.posts.length - a.posts.length)
                debug(sorted)


                setRanking(sorted)
            } catch (err) {
                console.error('Erro durante a busca:', err)
            } finally {
                setLoading(false)
            }
        }
        getRanking()
    }, [])
    if (ranking.length === 0) return
    return (
        <div className={styles.container}>
            <div className={styles.starContainer}>
                <div className={`${styles.goldStar} ${styles.star}`}>
                    <FaStar size={60} />
                    <p>{ranking[0].email}</p>
                </div>
                <div className={`${styles.bronzeStar} ${styles.star}`}>
                    <FaStar size={40} />
                    <p>{ranking[2].email}</p>
                </div>
                <div className={`${styles.silverStar} ${styles.star}`}>
                    <FaStar size={50} />
                    <p>{ranking[1].email}</p>
                </div>
            </div>
            <div className={styles.rankContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>email</td>
                            <td>streaks</td>
                        </tr>
                    </thead>
                    <tbody className={styles.tbodyContainer}>
                        {ranking.map((item, index) =>
                            <tr key={index} className={styles.row}>
                                <td>{item.email}</td>
                                <td>{calculateStreak(item.posts).currentStreak}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}