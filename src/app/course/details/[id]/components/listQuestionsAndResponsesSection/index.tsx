import { IDetailQuestion } from '@/services/api/question/QuestionService'
import {
    Box,
    Typography,
    Paper,
} from '@mui/material'
import { CommentComponent } from '../commentComponent'
import { ResponseSection } from '../responseSection'

interface IListQuestionsSection {
    questions: IDetailQuestion[]
    nameTeacher: string
    idTeacher: number
}

export const ListQuestionsAndResponsesSection: React.FC<IListQuestionsSection> = ({ questions, nameTeacher, idTeacher }) => {

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
                        <Box key={question.id} component={Paper}>
                            <CommentComponent 
                                key={question.id} 
                                labelName='Aluno' 
                                name={question.student.name} 
                                text={question.question_text} />

                            <ResponseSection 
                                idQuestion={question.id} 
                                questionResponses={question.Response} 
                                nameTeacher={nameTeacher} 
                                idTeacher={idTeacher}/>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}

