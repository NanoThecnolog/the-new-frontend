import axios from "axios";
const url = process.env.NEXT_PUBLIC_NEST
if (!url) {
    console.log("enviroment missing")
}
export const api = axios.create({
    baseURL: url
})