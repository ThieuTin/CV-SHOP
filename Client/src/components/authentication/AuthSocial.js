import { Stack, Button, Divider, Typography } from '@mui/material';
import { Google, Facebook, Twitter } from '@mui/icons-material';

const AuthSocial = () => (
    <Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button fullWidth size='large' color='error' variant='outlined'>
                <Google color='error' />
            </Button>

            <Button fullWidth size='large' variant='outlined'>
                <Facebook />
            </Button>

            <Button fullWidth size='large' variant='outlined'>
                <Twitter />
            </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'gray' }}>
                OR
            </Typography>
        </Divider>
    </Stack>
);

export default AuthSocial;
