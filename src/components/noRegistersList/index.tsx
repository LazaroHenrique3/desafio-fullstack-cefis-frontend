import { Box, Typography } from '@mui/material'
import { EnvironmentValues } from '@/environment'

export const NoRegistersList = () => {
    return ( 
        <Box width='100%' textAlign='center'>
            <Typography variant='h6'>
                {EnvironmentValues.EMPTY_LISTING}
            </Typography>
        </Box>
    )
}
 
