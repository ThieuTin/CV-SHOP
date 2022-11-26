import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form, FastField } from 'formik';

import useAuth from '../../../hooks/useAuth';
import { registerSchema } from '../../../utils/yupSchema';
import { InputField } from '../../custom-field';


const propTypes = {
    PATH_AUTH: PropTypes.object
};

const RegisterForm = ({ PATH_AUTH }) => {
    const history = useHistory();
    const { register } = useAuth();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    };
    const handleSubmit = async (values, { setErrors, resetForm }) => {
        try {
            const res = await register(values.name, values.email, values.password, values.passwordConfirm);
            history.replace(PATH_AUTH.login, res);
        } catch (error) {
            resetForm();
            setErrors({ afterSubmit: error.response.statusText });
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <Stack spacing={3}>
                        <FastField
                            name='name'
                            component={InputField}
                            type='text'
                            label='Your name'
                            color='success'
                        />
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
                            label='Pasword'
                            color='success'
                        />
                        <FastField
                            name='passwordConfirm'
                            component={InputField}
                            type='password'
                            label='Password confirmation'
                            color='success'
                        />
                        {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
                        <LoadingButton
                            loading={isSubmitting}
                            type='submit'
                            variant='contained'
                            color='error'
                            sx={{ padding: '15px 0', backgroundColor: '#f76254' }}
                        >
                            REGISTER
                        </LoadingButton>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

RegisterForm.propTypes = propTypes;

export default RegisterForm;
