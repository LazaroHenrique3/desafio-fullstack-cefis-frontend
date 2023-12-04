import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { UserService } from '@/services/api/user/UserService'

const nextAuthOptions: NextAuthOptions = {
    providers: [
        //Configurar o provider de credenciais: email e password
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text'},
                password: { label: 'password', type: 'password'}
            },

            // eslint-disable-next-line 
            async authorize(credentials, req): Promise<any> {
                //Caso venham como undefined eu retorno
                if(!credentials?.email && !credentials?.password) return

                const response = await UserService.signInUser({
                    email: credentials.email,
                    password: credentials.password
                })

                //Verificando se foi retornado erro
                if(response instanceof Error){
                    //Lançando o erro para posteriormente pegar a mensagem dele
                    throw new Error(response.message)
                }
                
                return response
            },
        })
    ],
    pages: {
        signIn: '/'
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }