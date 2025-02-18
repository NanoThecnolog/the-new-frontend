import { getExperience, getLevel, getProgress, getTitlePerLevel } from '@/utils/Gamefication'
import styles from './styles.module.scss'
import { debug } from '@/utils/debugFunction'
import Image from 'next/image'

interface UserCardProps {
    newsLetters: string[];
}

export default function UserCard({ newsLetters }: UserCardProps) {

    const posts = newsLetters
    const uniquePosts = [...new Set(posts)]
    //debug(uniquePosts)
    const temp = {
        avatar: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.woueb.net%2Fimages%2Fmanga%2Fromain-manga.jpg&f=1&nofb=1&ipt=44ff213852ef9a7bbcf72a0c9e624c3e2a880f7e2c5852e751ff6a047b5d561e&ipo=images",
        title: getTitlePerLevel(getLevel(getExperience(365))),
        exp: getExperience(365),
        streakCount: uniquePosts.length,
        streakShield: true,
    }
    const level = getLevel(temp.exp)
    const levelProgress = getProgress(temp.exp).toFixed(0)
    //debug(temp)

    return (
        <div className={styles.container}>
            <div className={styles.avatarSection}>
                <div className={styles.avatarContainer}>
                    <Image src={temp.avatar} fill alt='avatar' />
                </div>
                <div>{temp.title}</div>
                <div>nivel: {level}</div>
                <div className={styles.barraTotal}>
                    <div className={styles.barraAtual} style={{ width: `${levelProgress}px` }}>
                    </div>
                </div>
            </div>
            <div className={styles.streakSection}>
                <div className={styles.streakContainer}>
                    <h4>Streak</h4>
                    <div className={styles.streakCount}>
                        <p>{temp.streakCount}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}