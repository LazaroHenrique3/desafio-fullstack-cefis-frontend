import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface IPrivateLayoutProps {
    children: React.ReactNode
}

//Ficará envolta de todas as páginas protegidas
export default async function PrivateLayout({ children }: IPrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions)

    if (!session || session.user.typeUser !== 'TEACHER') {
        redirect('/')
    }

    return (
        <>{children}</>
    )
}