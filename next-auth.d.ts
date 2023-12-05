// eslint-disable-next-line 
import NextAuth from 'next-auth'
import { TUserRole } from '@/services/api/user/UserService'

declare module 'next-auth' {
    interface Session {
        user: {
            id: number
            email: string
            name: string
            typeUser: TUserRole
        },
        token: string
    }
}