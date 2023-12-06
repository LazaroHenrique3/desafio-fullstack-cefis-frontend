import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { LogoutRounded } from '@mui/icons-material'

interface ILogoutButtonProps {
    textButton?: string
}

export const LogoutButton: React.FC<ILogoutButtonProps> = ({ textButton }) => {
    const router = useRouter()

    async function logout() {
        if (confirm('Realmente deseja sair?')) {
            await signOut({
                redirect: false
            })

            router.replace('/')
        }
    }

    return (
        <Button
            variant='contained'
            color='secondary'
            startIcon={<LogoutRounded />}
            onClick={logout}
        >
            {(textButton) ? textButton : 'Sair'}
        </Button>
    )
}

