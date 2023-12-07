'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    LinearProgress,
    Paper
} from '@mui/material'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BasePageLayout } from '@/app/(private-routes)/BasePageLayout'
import {
    VForm,
    VTextField,
    VTextFieldPassword,
    useVForm
} from '@/components/forms'

import { UserService } from '@/services/api/user/UserService'
import { UseHandleUser } from './hooks/customHooks'

const User = () => {

    const { formRef } = useVForm('formRef')

    //Pegando o id da url
    const params = useParams()
    const { id } = params

    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')

    //Tratar a questão de senha na alteração
    const [isAlterPassword, setIsAlterPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    //Tratar redirecionamentos
    const router = useRouter()

    //hooks personalizados
    const { handleSave, handleDelete } = UseHandleUser({
        setIsLoading,
        setIsAlterPassword,
        setName, formRef,
        id: Array.isArray(id) ? Number(id[0]) : Number(id)
    })

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const result = await UserService.getUserById(Number(id))

            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                router.push('/home')
                return
            }

            setName(result.name)
            formRef.current?.setData(result)
        }

        fetchData()
    }, [])

    return (
        <BasePageLayout title={name}>

            <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

                    <Grid container direction='column' padding={2} spacing={2}>
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' color='secondary' />
                            </Grid>
                        )}

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label='Nome' name='name' disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth type='email' label='Email' name='email' disabled={isLoading} />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>

                            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                                <FormControlLabel control={<Checkbox checked={isAlterPassword} onChange={() => setIsAlterPassword(!isAlterPassword)} />} label='Alterar senha' />
                            </Grid>

                        </Grid>

                        {isAlterPassword && (
                            <Grid container item direction='row' spacing={2}>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextFieldPassword
                                        fullWidth
                                        name='password'
                                        label='Senha'
                                        disabled={isLoading}
                                        showPassword={showPassword}
                                        handleClickShowPassword={setShowPassword} />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextFieldPassword
                                        fullWidth
                                        name='confirmPassword'
                                        label='Confirmar Senha'
                                        disabled={isLoading}
                                        showPassword={showConfirmPassword}
                                        handleClickShowPassword={setShowConfirmPassword} />
                                </Grid>

                            </Grid>
                        )}

                    </Grid>

                </Box>

                <Box margin={1} display='flex' justifyContent='center' flexWrap='wrap' gap={2} padding={2} component={Paper} variant='outlined'>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: '150px' }}
                        type='submit'
                        disabled={isLoading}
                    >
                        Salvar
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        sx={{ width: '150px' }}
                        disabled={isLoading}
                        onClick={handleDelete}
                    >
                        Deletar
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ width: '150px' }}
                        onClick={() => router.push('/home')}
                        disabled={isLoading}
                    >
                        Voltar
                    </Button>
                </Box>
            </VForm>

        </BasePageLayout>
    )
}

export default User