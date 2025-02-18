import { UserProps } from '@/types/User'
import styles from './styles.module.scss'
import { debug } from '@/utils/debugFunction'
import { useMemo } from 'react'

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
        //debug(date)
        //  debug(user?.newsLetters)
        const formattedNewsLetters = user?.newsLetters.map(post => post.replace('post_', ''))
        return formattedNewsLetters.includes(date)
    }, [user])
    //debug(hasRead)

    return (
        <div className={styles.container}>
            <div>
                news de hoje
            </div>

            {hasRead ?
                <div>
                    Você visualizou! Continue acompanhando nossas notícias para aumentar seu streak e receber mais recompensas!
                </div>
                : <div>
                    Você ainda não visualizou! Corre pra aumentar seu streak
                </div>
            }
        </div>
    )
}