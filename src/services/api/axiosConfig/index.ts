import axios, { AxiosInstance } from 'axios'
import { getSession } from 'next-auth/react'

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_BASE,
})

//Adicionando o token da sessão ao bearer Token do axios
api.interceptors.request.use(async function (config) {
    const session = await getSession()
    config.headers.Authorization = session?.token  ? `Bearer ${session.token}` : ''

    return config
})

export { api }