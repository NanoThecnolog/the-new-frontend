import { ReactNode } from "react";
import { UserProps } from "./User";

export type ContextProviderProps = {
    children: ReactNode;
}
export interface ContextProps {
    user: UserProps | null,
    setUser: (user: UserProps) => void,
    signIn: (email: string) => Promise<void>
}