import axios from "axios";
const url = process.env.NEXT_PUBLIC_NEST
export const api = axios.create({
    baseURL: url
})