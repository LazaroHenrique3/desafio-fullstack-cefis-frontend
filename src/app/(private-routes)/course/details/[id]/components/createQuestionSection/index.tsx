'use client'
import { useState } from 'react'
import {
    Box,
    Button,
    Grid,
    LinearProgress,
    Typography,
    Paper
} from '@mui/material'
import { VForm, VTextField, useVForm } from '@/components/forms'
import { IDetailQuestion } from '@/services/api/question/QuestionService'
import { UseHandleQuestion } from './hooks/customHooks'

interface ICreateQuestionSectionProps {
    setQuestions: (updatedQuestions: IDetailQuestion[]) => void
    questions: IDetailQuestion[]
    idCourse: number
    idStudent: number
}

export const CreateQuestionSection: React.FC<ICreateQuestionSectionProps> = ({ setQuestions, questions, idCourse, idStudent }) => {
    const { formRef } = useVForm('formRef')

    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Hooks personalizados
    const { handleSave } = UseHandleQuestion({
        setIsLoading,
        setQuestions,
        questions,
        idCourse,
        idStudent,
        formRef,
    })

    return (
        <Box width='100%' marginTop={3}>
            <VForm ref={formRef} onSubmit={handleSave}>

                <Box margin={1}>
                    <Typography variant='h5'>
                        Faça sua pergunta
                    </Typography>
                </Box>

                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
                    <Grid container direction='column' padding={2} spacing={2}>
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' color='secondary' />
                            </Grid>
                        )}

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                <VTextField fullWidth size='small' label='Pergunta' name='question_text' disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ width: '150px' }}
                                    type='submit'
                                >
                                    Perguntar
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>
            </VForm>
        </Box>
    )
}

