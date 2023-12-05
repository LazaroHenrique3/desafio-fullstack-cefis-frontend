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
        const confirmLogout = confirm('Realmente deseja sair?')

        if (confirmLogout) {
            await signOut({
                redirect: false
            })

            router.replace('/login')
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

