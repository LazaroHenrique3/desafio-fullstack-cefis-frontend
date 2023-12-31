'use client'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { LogoutButton } from '../logoutButton'

import logo from '../../.././public/cefis-white-logo.png'
import { TUserRole } from '@/services/api/user/UserService'

interface IPageProps {
    page: string;
    href: string;
}

export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    //name do user autenticado na sessão
    const [userName, setUserName] = useState<string>('')
    const [userId, setUserId] = useState<number>()
    const [typeUser, setTypeUser] = useState<TUserRole>()

    useEffect(() => {
        const fetchSessionUser = async () => {
            //Pegando o name do user autenticado
            const session = await getSession()

            //Adicionando as informações do user da sessão dentro dos states
            if (session?.user.name &&  session?.user.id && session?.user.typeUser) {
                setUserName(session.user.name.split(' ')[0])//Pegando o primeiro nome
                setUserId(session.user.id)
                setTypeUser(session?.user.typeUser)
            }
        }

        fetchSessionUser()
    }, [])

    const pages: IPageProps[] = [
        { page: 'Home', href: '/home' },
        { page: 'Meu perfil', href: `/user/${userId}` },
        { page: `${(typeUser && typeUser === 'TEACHER') ? 'Alunos' : 'Professores'}`, href: '/users' }
    ]

    //Se for professor ele deve ter acesso a listagem dos seus próprios cursos
    if(typeUser === 'TEACHER') {
        pages.push({ page: 'Cursos', href: '/courses' })
    }
  
    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Image alt='logo-cefis' src={logo} height={40} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Link
                                    key={page.page}
                                    href={page.href}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.page}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Image alt='logo-cefis' src={logo} height={30} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link key={page.page}
                                href={page.href}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.page}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <LogoutButton textButton={userName}/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
