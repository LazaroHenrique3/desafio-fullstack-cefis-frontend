import { VForm, VTextField, useVForm } from '@/components/forms'
import {
    Box,
    Button,
    Grid,
    LinearProgress,
    Typography,
    Paper
} from '@mui/material'
import { VAutoCompleteStudent } from '../VAutoCompleteStudent'

interface ICreateQuestionSectionProps {
    isLoading: boolean
}

export const CreateQuestionSection: React.FC<ICreateQuestionSectionProps> = ({ isLoading }) => {
    const { formRef } = useVForm('formRef')

    return (
        <Box width='100%' marginTop={3}>
            <VForm ref={formRef} onSubmit={() => console.log()}>

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
                            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                <VAutoCompleteStudent isExternalLoading={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                <VTextField fullWidth label='Pergunta' name='question_text' disabled={isLoading} />
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
                        Perguntar
                    </Button>
                </Box>
            </VForm>
        </Box>
    )
}

