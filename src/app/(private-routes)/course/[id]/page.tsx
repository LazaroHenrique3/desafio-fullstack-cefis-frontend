'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
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

import { BasePageLayout } from '@/app/(private-routes)/BasePageLayout'
import {
    VForm,
    VTextField,
    useVForm
} from '@/components/forms'

import { CourseService } from '@/services/api/course/CourseService'
import { UseHandleCourse } from './hooks/customHooks'

const Course = () => {
    const { formRef } = useVForm('formRef')

    //Pegando o id da url
    const params = useParams()
    const { id } = params

    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')

    //Tratar redirecionamentos
    const router = useRouter()

    //id do user logado
    const [idUser, setIdUser] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            //Para pegar as informações da sessão
            const session = await getSession()

            if (session?.user.id) {
                setIdUser(session.user.id)
            }

            //Siginifica que alteração
            if (id !== 'new') {
                setIsLoading(true)
                const result = await CourseService.getCourseById(Number(id))

                setIsLoading(false)

                if (result instanceof Error) {
                    toast.error(result.message)
                    router.push('/courses')
                    return
                }

                setName(result.title)
                formRef.current?.setData(result)
            } else {
                formRef.current?.setData({
                    tile: '',
                    duration: '',
                })
            }

            return
        }

        fetchData()
    }, [])

    //hooks personalizados
    const { handleSave } = UseHandleCourse({
        setIsLoading,
        setName, formRef,
        id: Array.isArray(id) ? id[0] : id as string,
        idUser: idUser
    })

    return (
        <BasePageLayout title={id === 'new' ? 'Novo curso' : name}>

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
                                <VTextField fullWidth label='Título' name='title' disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth type='number' label='Duração' name='duration' disabled={isLoading} />
                            </Grid>
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
                        onClick={() => router.push('/courses')}
                    >
                        Voltar
                    </Button>
                </Box>
            </VForm>

        </BasePageLayout>
    )
}

export default Course