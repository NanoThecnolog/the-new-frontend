import { UserProps } from '@/types/User'
import styles from './styles.module.scss'
import { useMemo } from 'react'
import { getDatePost } from '@/utils/dates'
import { IoCheckmarkDone } from 'react-icons/io5'
import { IoMdClose } from "react-icons/io";

interface ChallengeProps {
    user: UserProps | null
}

export default function ChallengeCard({ user }: ChallengeProps) {
    //desafio diário de leitura. marcar se o usuário clicou na newsLetter de hoje ou não
    const hasRead = useMemo(() => {
        if (!user?.newsLetters) return false
        const today = new Date()
        const date = today.toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC'
        }).split('/').reverse().join('-')
        const { newsLetters } = user
        const formattedNewsLetters = getDatePost(newsLetters)
        return formattedNewsLetters.includes(date)
    }, [user])

    return (
        <div className={styles.container}>
            <div>
                Newsletter diária
            </div>

            {hasRead ?
                <div className={styles.success}>
                    <p><IoCheckmarkDone size={30} />Você visualizou! Parabéns!</p>
                </div>
                : <div className={styles.warning}>
                    <p>
                        <IoMdClose size={30} />
                    </p>
                    <p>
                        Você ainda não visualizou? Corre que ainda dá tempo!
                    </p>
                </div>
            }
        </div>
    )
}