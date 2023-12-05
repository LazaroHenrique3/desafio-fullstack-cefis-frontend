'use client'
import { SessionProvider } from 'next-auth/react'

//Traduções do yup
import '.././services/yup/TranslationsYup'

interface INextAuthSessionProviderProps {
    children: React.ReactNode
}

//Irá tornar público para todas as páginas que o usuário esta logado
export const NextAuthSessionProvider = ({ children }: INextAuthSessionProviderProps) => {
    return ( 
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
 