import { useHistory } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';
import { useDispatch } from 'react-redux';

// slices
import { editProfile } from '../../redux/slices/user';
// utils
import { shippingSchema } from '../../utils/yupSchema';
// path
import { PATH_CHECKOUT } from '../../routes/path';

const ShippingForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            phone: '',
            address: '',
        },
        validationSchema: shippingSchema,
        onSubmit: values => {
            dispatch(editProfile({
                history,
                path: PATH_CHECKOUT.payment,
                values
            }));
        }
    });
    const { getFieldProps, isSubmitting, touched, errors } = formik;
    return (
        <FormikProvider value={formik}>
            <Form>
                <Stack
                    spacing={2}
                    sx={{ width: '385px' }}
                >
                    <TextField
                        fullWidth
                        label='Phone'
                        variant='standard'
                        {...getFieldProps('phone')}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                    />
                    <TextField
                        fullWidth
                        label='Address'
                        variant='standard'
                        {...getFieldProps('address')}
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                    />
                    <Stack alignItems='end'>
                        <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                            Add this delivery
                        </LoadingButton>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default ShippingForm;
