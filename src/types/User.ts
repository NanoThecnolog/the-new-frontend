export interface UserData {
    id: string,
    email: string,
    req_id: string,
    created_at: Date
}

export interface UserProps {
    email: string,
    newsLetters: string[]
}