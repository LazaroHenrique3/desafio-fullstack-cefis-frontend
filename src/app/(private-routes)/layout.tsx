import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import Footer from '@/components/footer'

interface IPrivateLayoutProps {
    children: React.ReactNode
}

//Ficará envolta de todas as páginas protegidas
export default async function PrivateLayout({ children }: IPrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions)

    if (!session) {
        redirect('/login')
    }

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, paddingTop: '40px' }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}