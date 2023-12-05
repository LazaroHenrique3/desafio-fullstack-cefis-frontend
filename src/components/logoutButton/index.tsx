import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { LogoutRounded } from '@mui/icons-material'

export const LogoutButton = () => {
    const router = useRouter()

    async function logout() {
        await signOut({
            redirect: false
        })

        router.replace('/login')
    }

    return (
        <Button 
            variant='contained' 
            color='secondary' 
            startIcon={<LogoutRounded />}
            onClick={logout}
        >
            Sair
        </Button>
    )
}

