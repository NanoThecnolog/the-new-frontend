import { getDatePost } from "./dates"
import { debug } from "./debugFunction"

export interface DataProps {
    email: string,
    req_id: string

}

/**
 * Função que retorna os dados da requisição agrupados por email.
 * @param data dados da requisição ao backend
 * @returns retorna um array com objetos que incluem email unico e cada post visto
 */
export const groupedData = (data: DataProps[]) => {
    const map = new Map<string, { email: string, posts: string[] }>()

    for (const item of data) {
        if (!map.has(item.email)) {
            map.set(item.email, { email: item.email, posts: [] })
        }
        if (item.req_id) {
            const postIDs = map.get(item.email)!.posts
            postIDs.push(item.req_id)
            map.get(item.email)!.posts = getDatePost([...new Set(postIDs)])
        }
    }
    debug(Array.from(map.values()))
    return Array.from(map.values())
}

type VisitorData = {
    email: string,
    posts: string[]
}
type PostStats = {
    post: string,
    leitores: number
}


/**
 * Função que soma visitantes por postagem
 * @param data dados da requisição ao backend
 * @returns Retorna os dados agrupados por posts com contagem de visitantes
 */
export function transformData(data: VisitorData[]): PostStats[] {
    const postMap = new Map<string, number>()

    data.forEach(({ posts }) => {
        posts.forEach((post) => {
            postMap.set(post, (postMap.get(post) || 0) + 1)
        })
    })
    return Array.from(postMap, ([post, leitores]) => ({ post, leitores }))
        .sort((a, b) => new Date(a.post).getTime() - new Date(b.post).getTime())
}

/**
 * Função para verificar qual post teve mais visitas
 * @param data dados da requisição ao backend
 * @returns Retorna objeto 
 */
export function getTopEngagement(data: DataProps[]) {
    if (data.length === 0) return null;

    const uniqueEmails = new Set(data.map(v => v.email))
    const totalUsers = uniqueEmails.size

    const newsVisits = new Map<string, number>()
    data.forEach(({ req_id }) => {
        newsVisits.set(req_id, (newsVisits.get(req_id) || 0) + 1)
    })


    let topNews: string | null = null;
    let high = 0

    newsVisits.forEach((visitCount, newsId) => {

        const engage = (visitCount / totalUsers) * 100
        /*debug("usuarios", totalUsers)
        debug("visitas", visitCount)
        debug("Engage", engage)
        debug("post", newsId)*/

        if (engage > high) {
            high = engage
            topNews = newsId
        }
    })


    return topNews ? {
        newsId: topNews,
        engagePercent: high
    } : null
}
type EngagementProps = {
    post: string,
    leitores: number
}

export function getPostTotalVisits(data: DataProps[]): EngagementProps[] {
    if (data.length === 0) return []

    const postVisitCount = new Map<string, number>()

    data.forEach(({ req_id }) => {
        postVisitCount.set(req_id, (postVisitCount.get(req_id) || 0) + 1)
    })
    const engageResults: EngagementProps[] = []
    postVisitCount.forEach((visitCount, post) => {
        engageResults.push({ post, leitores: visitCount })
    })

    return engageResults
}