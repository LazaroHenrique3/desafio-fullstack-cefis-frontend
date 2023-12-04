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

interface IResponseSectionProps {
    questionResponses: IDetailResponse[]
    idQuestion: number
    idTeacher: number
    nameTeacher: string
}

export const ResponseSection: React.FC<IResponseSectionProps> = ({ questionResponses, idQuestion, idTeacher, nameTeacher }) => {
    const { formRef } = useVForm('formRef')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [responses, setResponses] = useState<IDetailResponse[]>(questionResponses)

    const [isShowResponses, setIsShowResponses] = useState<boolean>(false)

    //Hooks personalizados
    const { handleSave } = UseHandleResponse({
        setIsLoading,
        setResponses,
        idQuestion,
        idTeacher,
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

                    {/* Listagem de respostas */}
                    {(responses.length === 0) ? (
                        <Box margin={1}>Aguardando resposta...</Box>
                    ) : (
                        <Box margin={1}>
                            <Typography sx={{ fontWeight: '400' }}>
                                Respostas
                            </Typography>
                            <Divider />

                            {responses.map((response) => (
                                <CommentComponent key={response.id} labelName='Professor' name={nameTeacher} text={response.response_text} />
                            ))}
                        </Box>
                    )}
                </>
            )}
        </Box>
    )
}

