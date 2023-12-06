import {
    Box,
    IconButton,
    Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface ICommentComponentProps {
    showDeleteButton: boolean //Serve para verificar se quem esta autenticado é dono dessa pergunta ou resposta, para então pode deletar ela
    handleDeleteButton?: () => void 
    name: string
    labelName: 'Aluno' | 'Professor'
    text: string
}

export const CommentComponent: React.FC<ICommentComponentProps> = ({ showDeleteButton = false, handleDeleteButton, name, labelName, text }) => {
    return (
        <Box padding={2}>
            <Box display='flex' justifyContent='space-between'>
                <Box>
                    <Typography sx={{ fontWeight: '600' }}>
                        - {labelName}: {name}
                    </Typography>
                    <Typography>{text}</Typography>
                </Box>

                {(showDeleteButton && handleDeleteButton) && (
                    <IconButton color="error" onClick={() => handleDeleteButton()}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    )
}

