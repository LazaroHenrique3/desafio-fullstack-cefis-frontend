'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import {
    Box,
    Grid,
    Pagination,
    Typography
} from '@mui/material'

import { CardCourses } from './components/cardCourses'
import { CourseService, IListCourse } from '@/services/api/course/CourseService'
import { Loading } from '@/components/loading'
import { EnvironmentValues } from '@/environment'
import SearchSection from '@/components/searchSection'
import { TUserRole } from '@/services/api/user/UserService'

const Home = () => {
    const [courses, setCourses] = useState<IListCourse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    //Armazena o texto a ser pesquisado e sempre que é modificado aciona o useEffect
    const [searchText, setSearchText] = useState<string>('')

    //Amazenando informações do user da sessão
    const [userName, setUserName] = useState<string>('')
    const [userType, setUserType] = useState<TUserRole | ''>('')

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            //Pegando as informações da sessão
            const session = await getSession()
            setUserName(session?.user.name || '')
            setUserType(session?.user.typeUser || '')

            const coursesData = await CourseService.listCourse(page, searchText)
            setIsLoading(false)

            if (coursesData instanceof Error) {
                return
            }

            setCourses(coursesData.data)
            setTotalCount(coursesData.totalCount)
        }

        fetchData()
    }, [page, searchText])

    return (
        <Box width='100%' textAlign='center' padding={3} paddingTop={5}>
            <Typography variant='h5' marginBottom={5}>
                Seja bem-vindo, {(userType === 'TEACHER') ? 'Professor(a) ' : ' '} {userName}!
            </Typography>

            <Typography variant='h6' color='secondary' fontWeight='600' marginBottom={5}>
                CONHEÇA NOSSOS CURSOS
            </Typography>

            <Grid container padding={2} spacing={5}>
                {/* Area de pesquisa, basicamente vai alterar o searchText, que irá disparar o useEffect*/}
                <Grid container item xs={12} justifyContent='end'>
                    <SearchSection isExternalLoading={isLoading} setExternalSearchText={setSearchText} />
                </Grid>

                {(isLoading) ? (
                    /* Condicional para caso esteja em fase de loading */
                    <Grid container item xs={12} justifyContent='center'>
                        <Loading />
                    </Grid>
                ) : (courses.length === 0) ? (
                    /* Condiciconal para caso não exista cursos cadastrados ou encontrados */
                    <Grid container item xs={12} justifyContent='center'>
                        <Typography variant='h6' marginTop={5}>
                            No momento não foram encontrados cursos disponíveis, mas nossos profissionais estão empenhados nisso! 🤝
                        </Typography>
                    </Grid>

                ) : (
                    <>
                        {/* Contagem de total de resultados encontrados */}
                        <Grid container item xs={12} justifyContent='center'>
                            <Typography>
                                ({totalCount}) resultados no total.
                            </Typography>
                        </Grid>

                        {/* Listagens dos cards de cursos */}
                        {courses.map((course) => (
                            <CardCourses key={course.id}
                                title={course.title}
                                teacherName={course.teacher.name}
                                courseId={course.id}
                                duration={course.duration}
                                router={router} />
                        ))}
                    </>
                )}

                {/* Relacionado a paginação*/}
                {(totalCount > 0 && totalCount > EnvironmentValues.LINE_LIMIT && totalCount !== courses.length) && (
                    <Grid container item xs={12} justifyContent='center'>
                        <Pagination
                            page={page}
                            count={Math.ceil(totalCount / EnvironmentValues.LINE_LIMIT)}
                            onChange={(e, newPage) => setPage(newPage)}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default Home