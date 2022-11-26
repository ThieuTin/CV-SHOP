import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Link, Stack, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form, FastField } from 'formik';

import useAuth from '../../../hooks/useAuth';
import { InputField } from '../../custom-field';
import { loginSchema } from '../../../utils/yupSchema';
// path
import { PATH_PAGE, ROOT_EXTERNAL } from '../../../routes/path';

const LoginForm = () => {
    const history = useHistory();
    const { state } = history.location;
    const { login } = useAuth();
    const initalValues = {
        email: '',
        password: ''
    };
    const handleSubmit = async (values, { setErrors, resetForm }) => {
        try {
            const role = await login(values.email, values.password);
            if (role === 'Admin') {
                window.location.href = ROOT_EXTERNAL;
                return;
            }
            const path = state?.from ? state.from : PATH_PAGE.home;
            history.replace(path);
        } catch (error) {
            resetForm();
            setErrors({ afterSubmit: error.response.statusText });
        }
    };
    return (
        <Formik
            initialValues={initalValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <Stack spacing={3}>
                        <FastField
                            name='email'
                            component={InputField}
                            type='text'
                            label='Email address'
                            color='success'
                        />
                        <FastField
                            name='password'
                            component={InputField}
                            type='password'
                            label='Password'
                            color='success'
                        />
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <FormControlLabel
                                control={<Checkbox color='error' />}
                                label="Remember me"
                            />
                            <Link color='#f76254' component={RouterLink} variant='subtitle2' to='#'>
                                Forgot password?
                            </Link>
                        </Stack>
                        {state && state.message && <Alert severity="success">{state.message}</Alert>}
                        {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
                        <LoadingButton
                            loading={isSubmitting}
                            type='submit'
                            variant='contained'
                            color='error'
                            sx={{ padding: '15px 0', backgroundColor: '#f76254' }}
                        >
                            LOGIN
                        </LoadingButton>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
