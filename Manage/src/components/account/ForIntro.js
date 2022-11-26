import { Stack, Typography, Chip } from '@mui/material';

const ForIntro = () => {
    return (
        <>
            <Typography variant='subtitle2'>Account types</Typography>
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
                sx={{ flexWrap: 'wrap' }}
            >
                <Chip label='Residential Account' sx={{ mb: 1 }} />
                <Chip label='Commercial Account' sx={{ mb: 1 }} />
                <Chip label='Furniture Designer' sx={{ mb: 1 }} />
                <Chip label='Industrial Account' sx={{ mb: 1 }} />
                <Chip label='Urban Designer' sx={{ mb: 1 }} />
            </Stack>
        </>
    );
};

export default ForIntro;
