'use client'
import { useParams, useRouter } from 'next/navigation.js'
import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Divider,
    Typography
} from '@mui/material'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CreateQuestionSection } from './components/createQuestionSection'
import { ListQuestionsSection } from './components/listQuestions'
import { CourseService, IDetailCourseWithAllProps } from '@/services/api/course/CourseService'
import { Loading } from '@/components/loading'

interface IInfoCourseProps {
    label: string
    value: string
}

const InfoCourse: React.FC<IInfoCourseProps> = ({ label, value }) => (
    <Typography variant='h6' fontSize={18} textOverflow='ellipsis'>
        <strong>{label}: </strong> {value}
    </Typography>
)

const CourseDetails = () => {

    //Pegando o id da url
    const params = useParams()
    const { id } = params

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const [course, setCourse] = useState<IDetailCourseWithAllProps>({} as IDetailCourseWithAllProps)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const resultCourse = await CourseService.getCourseById(Number(id))

            setIsLoading(false)

            if (resultCourse instanceof Error) {
                toast.error(resultCourse.message)
                router.push('/courses')
                return
            }

            setCourse(resultCourse)
        }

        fetchData()
    }, [])

    return (
        <Box height='100%' padding={5}>
            <Box maxWidth='1000px' sx={{ margin: '0 auto' }}>
                {(isLoading || course.teacher === undefined) ? (
                    <Loading />
                ) : (
                    <>
                        <Box display='flex' justifyContent='space-between'>
                            <Box>
                                <Typography color='secondary' variant='h4'>
                                    Curso: {course.title}
                                </Typography>

                                <InfoCourse label='Professor' value={course.teacher.name} />
                                <InfoCourse label='Duração' value={`${course.duration} Hr(s)`} />
                            </Box>

                            <Box>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ width: '80px' }}
                                    onClick={() => router.push('/courses')}
                                >
                                    Voltar
                                </Button>
                            </Box>
                        </Box>

                        <Divider />
                        <CreateQuestionSection isLoading={isLoading} />

                        <Divider />
                        <ListQuestionsSection questions={course.Question} />
                    </>
                )}
            </Box>
        </Box>
    )
}

export default CourseDetails

