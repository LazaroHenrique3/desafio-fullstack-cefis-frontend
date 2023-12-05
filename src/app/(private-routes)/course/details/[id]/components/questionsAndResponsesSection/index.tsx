'use client'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import {
    Box,
    Typography,
    Paper,
    Pagination,
} from '@mui/material'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CommentComponent } from '../commentComponent'
import { ResponseSection } from '../responseSection'
import { IDetailQuestion, QuestionService } from '@/services/api/question/QuestionService'
import { Loading } from '@/components/loading'
import { CreateQuestionSection } from '../createQuestionSection'
import { EnvironmentValues } from '@/environment'
import { TUserRole } from '@/services/api/user/UserService'

interface IListQuestionsSection {
    idCourse: number
    idTeacher: number //Se refere ao id do user(Professor) que criou o curso
}

export const QuestionsAndResponsesSection: React.FC<IListQuestionsSection> = ({ idCourse, idTeacher }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [questions, setQuestions] = useState<IDetailQuestion[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    //Informações do user autenticado na sessão
    const [nameUser, setNameUser] = useState<string>()
    const [typeUser, setTypeUser] = useState<TUserRole>()
    const [idUser, setIdUser] = useState<number>()

    /* Buscando todas as perguntas vinculadas ao curso */
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            //Pegando o tipo do user autenticado
            const session = await getSession()
            setNameUser(session?.user.name)
            setTypeUser(session?.user.typeUser)
            setIdUser(session?.user.id)

            //Buscando as perguntas do curso
            const resultQuestions = await QuestionService.listQuestion(idCourse, page)

            setIsLoading(false)

            if (resultQuestions instanceof Error) {
                toast.error(resultQuestions.message)
                return
            }

            setQuestions(resultQuestions.data)
            setTotalCount(resultQuestions.totalCount)
        }

        fetchData()
    }, [page])

    return (
        <Box width='100%' marginTop={3}>
            {/* Seção de criação de novas perguntas, só deve ser apresentada a user do tipo STUDENT */}
            {(typeUser && idUser && typeUser === 'STUDENT') && (
                <CreateQuestionSection questions={questions} setQuestions={setQuestions} idStudent={idUser} idCourse={idCourse} />
            )}

            <Box margin={1}>
                <Typography variant='h5'>
                    Dúvidas dos alunos
                </Typography>
            </Box>

            <>
                {/* Aguardando  carregamento das perguntas */}
                {(isLoading) ? (
                    <Loading />
                ) : (
                    <>
                        {/* Caso não existam perguntas ainda */}
                        {(questions.length === 0) ? (
                            <Box width='100%' textAlign='center'>
                                <Typography sx={{ fontSize: '16px' }}>
                                    Sem dúvidas até o momento..
                                </Typography>
                            </Box>
                        ) : (
                            /* Seção de renderização das perguntas e suas respectivas respostas */
                            <Box display='flex' flexDirection='column' gap={2}>
                                {questions.map((question) => (
                                    <Box key={question.id} component={Paper}>
                                        {/* Renderiza na tela as perguntas */}
                                        <CommentComponent
                                            key={question.id}
                                            labelName='Aluno'
                                            name={question.student.name}
                                            text={question.question_text} />

                                        {/* Renderiza na tela as respectivas respostas de cada pergunta, caso for selecionado pelo usuario */}
                                        {(nameUser && idUser && typeUser) && (
                                            <ResponseSection
                                                idQuestion={question.id}
                                                questionResponses={question.Response}
                                                nameUser={nameUser}
                                                idUser={idUser}
                                                typeUser={typeUser}
                                                idTeacher={idTeacher} />
                                        )}
                                    </Box>
                                ))}

                                {/* Paginação de Perguntas */}
                                {(totalCount > 0 && totalCount > EnvironmentValues.LINE_LIMIT) && (
                                    <Box display='flex' justifyContent='center'>
                                        <Pagination
                                            page={page}
                                            count={Math.ceil(totalCount / EnvironmentValues.LINE_LIMIT)}
                                            onChange={(e, newPage) => setPage(newPage)}
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}
                    </>
                )}
            </>
        </Box>
    )
}

