'use client'
import { useState } from 'react'
import {
    Box,
    Button,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Typography
} from '@mui/material'

import { VForm, VTextField, useVForm } from '@/components/forms'
import { UseHandleResponse } from './hooks/customHooks'
import { IDetailResponse } from '@/services/api/response/ResponseService'
import { CommentComponent } from '../commentComponent'
import { TUserRole } from '@/services/api/user/UserService'

interface IResponseSectionProps {
    questionResponses: IDetailResponse[]
    idQuestion: number
    idTeacher: number // Se refere ao id do user(Professor) que criou o curso
    idUser: number //Se refere ao id do user na sessão
    nameTeacher: string //Se refere ao name do user dono do curso
    typeUser: TUserRole //Se refere ao tipo do user na sessão
}

export const ResponseSection: React.FC<IResponseSectionProps> = ({ questionResponses, idQuestion, idTeacher, idUser, nameTeacher, typeUser }) => {
    const { formRef } = useVForm('formRef')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [responses, setResponses] = useState<IDetailResponse[]>(questionResponses)

    const [isShowResponses, setIsShowResponses] = useState<boolean>(false)

    //Hooks personalizados
    const { handleSave, handleDelete } = UseHandleResponse({
        setIsLoading,
        setResponses,
        idQuestion,
        idUser,
        responses,
        formRef,
    })

    return (
        <Box width='100%' marginTop={1}>
            <Box padding={1}>
                <Button variant='contained' onClick={() => setIsShowResponses(!isShowResponses)}>
                    Ver respostas
                </Button>
            </Box>

            {(isShowResponses) && (
                <>
                    {/* Só renderiza a opção de cadastrar respostas se o usuário for professor e o curso for dele */}
                    {(typeUser === 'TEACHER' && idTeacher === idUser) && (
                        <VForm ref={formRef} onSubmit={handleSave}>
                            <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
                                <Grid container direction='column' padding={2} spacing={2}>
                                    {isLoading && (
                                        <Grid item>
                                            <LinearProgress variant='indeterminate' color='secondary' />
                                        </Grid>
                                    )}

                                    <Grid container item direction='row' spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                            <VTextField fullWidth label='Resposta' name='response_text' size='small' disabled={isLoading} />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                sx={{ width: '150px' }}
                                                type='submit'
                                            >
                                                Responder
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </VForm>
                    )}

                    {/* Listagem de respostas */}
                    {(responses.length === 0) ? (
                        <Box margin={1}>Aguardando resposta...</Box>
                    ) : (
                        <Box margin={1}>
                            <Typography sx={{ fontWeight: '400' }}>
                                Respostas
                            </Typography>
                            <Divider />

                            {/* Renderiza de fato as respostas do professor */}
                            {responses.map((response) => (
                                <CommentComponent 
                                    key={response.id} 
                                    showDeleteButton={idTeacher === idUser}
                                    handleDeleteButton={() => handleDelete(response.id)}
                                    labelName='Professor' 
                                    name={nameTeacher} 
                                    text={response.response_text} />
                            ))}
                        </Box>
                    )}
                </>
            )}
        </Box>
    )
}

