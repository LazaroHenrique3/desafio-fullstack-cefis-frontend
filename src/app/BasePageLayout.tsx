import { Box, Typography } from '@mui/material'

interface IBasePageLayoutProps {
    children: React.ReactNode,
    title: string,
}

export const BasePageLayout = ({children, title}: IBasePageLayoutProps) => {
    return (
        <Box height='100%' padding={5}>
            <Typography variant='h3' marginBottom={5}>
                {title}
            </Typography>

            {children}
        </Box>
    )
}

