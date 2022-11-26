import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';

import Page from '../../components/Page';
import { PATH_AUTH } from '../../routes/path';
import Logo from '../../components/Logo';
import AuthSocial from '../../components/authentication/AuthSocial';
import { RegisterForm } from '../../components/authentication/register';

const Register = () => (
    <Page title='Sign up | CV Shop'>
        <Stack direction='row' justifyContent='end' alignItems='center'>
            Already have an account? &nbsp;
            <Link color='#f76254' underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                Login
            </Link>
        </Stack>
        <Logo>Get started absolutely free.</Logo>
        <Typography variant='body1'>Free forever. No credit card needed.</Typography>
        <AuthSocial />
        <RegisterForm PATH_AUTH={PATH_AUTH} />
    </Page>
);

export default Register;
