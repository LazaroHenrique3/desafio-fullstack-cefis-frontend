'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
    Box,
    Card,
    CardContent,
    LinearProgress,
    CardActions,
    Button,
    Typography,
} from '@mui/material'

import { CircularProgress } from '@mui/material'
import {
    VForm,
    VTextField,
    VTextFieldPassword,
    useVForm
} from '@/components/forms'

import { UseHandleLogin } from './hooks/customHooks'

import logo from '../../../.././public/cefis-logo.png'

const Login = () => {
    //No retorno da página registerUser pode ser que seja passado o email
    const searchParams = useSearchParams()
    const search = searchParams.get('email')

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { formRef } = useVForm('formRef')

    //Verifico se foi passado algum email via params e adiciono no input
    useEffect(() => {
        formRef.current?.setData({
            email: (search !== null) ? search : '',
        })
    }, [])


    //Hooks personalizados
    const { handleLogin } = UseHandleLogin({ setIsLoading, formRef })

    return (
        <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <VForm ref={formRef} onSubmit={handleLogin}>

                    <CardContent>
                        <Box display='flex' flexDirection='column' gap={3} width={250}>
                            <Box display='flex' alignItems='center' flexDirection='column' gap={1}>
                                <Image alt='logo-cefis' src={logo} height={60} />

                                <Typography variant='h4' align='center'>
                                    LOGIN
                                </Typography>
                            </Box>

                            <VTextField
                                fullWidth
                                type='email'
                                label='Email'
                                name='email'
                                disabled={isLoading}
                                size='small' />

                            <VTextFieldPassword
                                fullWidth
                                name='password'
                                label='Senha'
                                disabled={isLoading}
                                showPassword={showPassword}
                                handleClickShowPassword={setShowPassword}
                                size='small' />

                        </Box>
                    </CardContent>

                    <CardActions>
                        <Box width='100%' display='flex' justifyContent='center'>
                            <Button
                                type='submit'
                                variant='contained'
                                disabled={isLoading}
                                endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}>
                                Entrar
                            </Button>
                        </Box>
                    </CardActions>
                </VForm>

                <Box width='100%' display='flex' justifyContent='center'>
                    <Link href={'/registerUser'}>
                        Crie sua conta gratuitamente
                    </Link>
                </Box>

                {isLoading && (
                    <LinearProgress variant='indeterminate' />
                )}
            </Card>
        </Box>
    )
}

export default Login
