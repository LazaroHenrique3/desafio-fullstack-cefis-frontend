'use client'
import { useState, useEffect } from 'react'
import { useParams, redirect, useRouter } from 'next/navigation'
import {
    Box,
    Button,
    Grid,
    LinearProgress,
    Paper
} from '@mui/material'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BasePageLayout } from '@/app/BasePageLayout'
import {
    VForm,
    VSelect,
    VTextField,
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

    //Tratar redirecionamentos
    const router = useRouter()

    //hooks personalizados
    const { handleSave } = UseHandleUser({
        setIsLoading,
        setName, formRef,
        id: Array.isArray(id) ? id[0] : id as string,
        router
    })

    useEffect(() => {
        const fetchData = async () => {
            //Siginifica que alteração
            if (id !== 'new') {
                setIsLoading(true)
                const result = await UserService.getUserById(Number(id))

                setIsLoading(false)

                if (result instanceof Error) {
                    toast.error(result.message)
                    redirect('/users')
                }
                console.log(result)
                setName(result.name)
                formRef.current?.setData(result)
            } else {
                formRef.current?.setData({
                    name: '',
                    role: ''
                })
            }

            return
        }

        fetchData()
    }, [])

    return (
        <BasePageLayout title={id === 'new' ? 'Novo usuário' : name}>

            <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

                    <Grid container direction='column' padding={2} spacing={2}>
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label='Nome' name='name' disabled={isLoading} />
                            </Grid>

                            {(id === 'new') && (
                                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                    <VSelect
                                        fullWidth
                                        label='Tipo'
                                        name='role'
                                        options={[
                                            { value: 'STUDENT', label: 'Aluno' },
                                            { value: 'TEACHER', label: 'Professor' },
                                        ]}
                                        disabled={isLoading} />
                                </Grid>
                            )}
                        </Grid>

                    </Grid>

                </Box>

                <Box margin={1} display='flex' gap={5} padding={2} component={Paper} variant='outlined'>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: '150px' }}
                        type='submit'
                    >
                        Salvar
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ width: '150px' }}
                        onClick={() => router.push('/users')}
                    >
                        Voltar
                    </Button>
                </Box>
            </VForm>

        </BasePageLayout>
    )
}

export default User