import { IDetailQuestion } from '@/services/api/question/QuestionService'
import {
    Box,
    Typography,
    Paper
} from '@mui/material'

interface IListQuestionsSection {
    questions: IDetailQuestion[]
}

export const ListQuestionsSection: React.FC<IListQuestionsSection> = ({ questions }) => {

    return (
        <Box width='100%' marginTop={3}>
            <Box margin={1}>
                <Typography variant='h5'>
                    Dúvidas dos alunos
                </Typography>
            </Box>

            {(questions.length === 0) ? (
                <Box width='100%' textAlign='center'>
                    <Typography sx={{ fontSize: '16px' }}>
                        Sem dúvidas até o momento..
                    </Typography>
                </Box>
            ) : (
                <Box display='flex' flexDirection='column' gap={2}>
                    {questions.map((question) => (
                        <Box key={question.id} component={Paper} padding={2}>
                            <Typography sx={{ fontWeight: '600' }}>
                                -{question.student.name}
                            </Typography>
                            <Typography>
                                {question.question_text}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}

