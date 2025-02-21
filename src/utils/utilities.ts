import { getDatePost } from "./dates"
import { debug } from "./debugFunction"

export interface DataProps {
    email: string,
    req_id: string

}


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