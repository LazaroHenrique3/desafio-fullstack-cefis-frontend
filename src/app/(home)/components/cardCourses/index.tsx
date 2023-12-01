'use client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from '@mui/material'

interface ICardCoursesProps {
    title: string,
    duration: number,
    teacherName: string
    courseId: number
    router: AppRouterInstance
}

export const CardCourses: React.FC<ICardCoursesProps> = ({ title, duration, teacherName, courseId, router }) => {
    return (
        <Grid container item xs={12} sm={6} md={4} lg={3} xl={2} justifyContent='center'>
            <Card sx={{ width: 280, height: '100%' }}>
                <Box height='100%' display='flex' flexDirection='column' justifyContent='space-between'>
                    <CardContent>
                        <Typography fontSize={20} fontWeight={600} gutterBottom>
                            {title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Duração: {duration} HRs
                        </Typography>
                        <Typography fontSize={18} variant="body2">
                            Professor: {teacherName}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button variant='contained' color='secondary' onClick={() => router.push(`/course/details/${courseId}`)}>
                            Ver curso
                        </Button>
                    </CardActions>
                </Box>
            </Card>
        </Grid>
    )
}

