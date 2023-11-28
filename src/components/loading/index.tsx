import { 
    Box, 
    CircularProgress, 
    Typography 
} from '@mui/material'

export const Loading = () => {
    return (
        <Box width='100%' textAlign='center'>
            <CircularProgress variant='indeterminate' color='secondary'/>
            <Typography>
                Carregando...
            </Typography>
        </Box>
    )
}

