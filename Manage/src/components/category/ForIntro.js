import { Stack, Typography, Chip, Avatar } from '@mui/material';

const ForIntro = () => {
    return (
        <>
            <Stack>
                <Typography variant='subtitle2'>Category styles</Typography>
                <Stack direction='row' spacing={1}>
                    <Chip label='Classic' variant='outlined' />
                    <Chip label='Modern' variant='outlined' />
                </Stack>
            </Stack>
            <Stack spacing={1}>
                <Typography variant='subtitle2'>In charge of Category</Typography>
                <Stack sx={{ px: 2 }}>
                    <Typography variant='subtitle2'>Teams</Typography>
                    <Stack direction='row' spacing={1}>
                        <Chip
                            avatar={<Avatar alt='Phoenix' src='https://i.pinimg.com/736x/ce/a7/c1/cea7c1c3377295b4e3ba605488ea3741.jpg' />}
                            label='Phoenix'
                            variant='outlined'
                        />
                        <Chip
                            avatar={<Avatar alt='White Tiger' src='https://i.pinimg.com/originals/27/de/61/27de611b6cdcf0e04499c57d8ccebfe1.jpg' />}
                            label='White Tiger'
                            variant='outlined'
                        />
                    </Stack>
                </Stack>
                <Stack sx={{ px: 2 }}>
                    <Typography variant='subtitle2'>Architects</Typography>
                    <Stack direction='row' spacing={1}>
                        <Chip
                            avatar={<Avatar alt='dot' src='http://dotshop69.000webhostapp.com/Public/images/tue.png' />}
                            label='Lê Chính Tuệ'
                            variant='outlined'
                        />
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};

export default ForIntro;
