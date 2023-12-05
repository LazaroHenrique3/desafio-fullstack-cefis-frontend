import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

interface IPrivateLayoutProps {
    children: React.ReactNode
}

//Ficará envolta de todas as páginas protegidas
export default async function PrivateLayout({ children }: IPrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions)

    if (session) {
        redirect('/home')
    }

    return (
        <>{children}</>
    )
}