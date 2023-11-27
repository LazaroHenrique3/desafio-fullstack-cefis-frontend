import Image from 'next/image'
import {
    Box,
    Paper,
    Link,
} from '@mui/material'
import { Instagram, Facebook, Twitter } from '@mui/icons-material'

import logo from '../../.././public/cefis-logo.png'

export const Footer = () => {
    return (
        <Box component={Paper} paddingX={5} paddingY={2}>
            <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
                <Box>
                    <Image alt='logo-cefis' src={logo} height={60} />
                </Box>

                <Box display='flex' gap={3}>
                    <Link href='https://www.instagram.com/cefis.com.br' target='_blank' underline='none'>
                        <Instagram />
                    </Link>
                    <Link href='https://www.facebook.com/cefis.gmt' target='_blank' underline='none'>
                        <Facebook />
                    </Link>
                    <Link href='https://twitter.com/_cefis_' target='_blank' underline='none'>
                        <Twitter />
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer