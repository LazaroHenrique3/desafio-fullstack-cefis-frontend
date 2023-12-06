'use client'
import { useState } from 'react'
import Link from 'next/link'
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
    VSelect,
    VTextField,
    VTextFieldPassword,
    useVForm
} from '@/components/forms'

import { UseHandleUserRegister } from './hooks/customHooks'

const RegisterUser = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { formRef } = useVForm('formRef')

    //Hooks personalizados
    const { handleRegister } = UseHandleUserRegister({ setIsLoading, formRef })

    return (
        <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <VForm ref={formRef} onSubmit={handleRegister}>

                    <CardContent>
                        <Box display='flex' flexDirection='column' gap={3} width={250}>

                            <Typography variant='h4' align='center'>
                                CADASTRO
                            </Typography>

                            <VTextField
                                fullWidth
                                label='Nome'
                                name='name'
                                disabled={isLoading}
                                size='small' />

                            <VTextField
                                fullWidth
                                type='email'
                                label='Email'
                                name='email'
                                disabled={isLoading}
                                size='small' />

                            <VSelect
                                fullWidth
                                label='Tipo'
                                name='role'
                                size='small'
                                options={[
                                    { value: 'STUDENT', label: 'Aluno' },
                                    { value: 'TEACHER', label: 'Professor' },
                                ]}
                                disabled={isLoading} />

                            <VTextFieldPassword
                                fullWidth
                                name='password'
                                label='Senha'
                                disabled={isLoading}
                                showPassword={showPassword}
                                handleClickShowPassword={setShowPassword}
                                size='small' />

                            <VTextFieldPassword
                                fullWidth
                                name='confirmPassword'
                                label='Confirmar Senha'
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
                                Salvar
                            </Button>
                        </Box>
                    </CardActions>
                </VForm>

                <Box width='100%' display='flex' justifyContent='center'>
                    <Link href={'/'}>
                        Voltar ao login
                    </Link>
                </Box>

                {isLoading && (
                    <LinearProgress variant='indeterminate' />
                )}
            </Card>
        </Box>
    )
}

export default RegisterUser
