'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Box,
    Card,
    CardContent,
    LinearProgress,
    CardActions,
    Button,
    Typography,
    Link
} from '@mui/material'

import { CircularProgress } from '@mui/material'
import { 
    VForm, 
    VTextField, 
    VTextFieldPassword, 
    useVForm 
} from '@/components/forms'

import { UseHandleLogin } from './hooks/customHooks'

const Login = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { formRef } = useVForm('formRef')

    //Hooks personalizados
    const { handleLogin } = UseHandleLogin({ setIsLoading, formRef })

    return (
        <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <VForm ref={formRef} onSubmit={handleLogin}>

                    <CardContent>
                        <Box display='flex' flexDirection='column' gap={3} width={250}>

                            <Typography variant='h4' align='center'>
                                LOGIN
                            </Typography>

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
                    <Link variant="body2" onClick={() => router.push('/userRegister')}>
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
