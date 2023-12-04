import {
    Box, Typography
} from '@mui/material'

interface ICommentComponentProps {
    name: string
    labelName: 'Aluno' | 'Professor'
    text: string
}

export const CommentComponent: React.FC<ICommentComponentProps> = ({name, labelName, text}) => {
    return (
        <Box padding={2}>
            <Typography sx={{ fontWeight: '600' }}>
                - {labelName}: {name}
            </Typography>
            <Typography>{text}</Typography>
        </Box>
    )
}

