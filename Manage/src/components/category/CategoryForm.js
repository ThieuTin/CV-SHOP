import PropTypes from 'prop-types';
import { Grid, Stack, Card, Typography, TextField, FormHelperText, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
// upload
import {UploadSingleFile, UploadMultipleFile} from '../upload';
// utils
import { createCategorySchema } from '../../utils/yupSchemas';
//api
import categoryApi from '../../apis/categoryApi';
// path
import { PATH_DASHBOARD } from '../../routes/path';
const propTypes = {
    isEdit: PropTypes.bool,
    category: PropTypes.object
};
const CategoryForm = ({isEdit, category}) => {
    const confirm = useConfirm();
    const navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: category?.title||'',
            image: category?.image||'',
            parentId: category?.parentId||'',
            displayOrder: category?.displayOrder||'',
            banners: category?.banners||[]
        },
        validationSchema: createCategorySchema,
        onSubmit: async (values, { resetForm }) => {
            const { title, image, banners, parentId, displayOrder } = values;
            var formData = new FormData();
            formData.append('title', title);
            formData.append('parentId', parentId);
            formData.append('displayOrder', displayOrder);
            formData.append('image', image.file);
            banners.forEach(banner => {
                formData.append('banners', banner);
            });
            let res = null;
            console.log(values);
            if (isEdit) {
                res = await categoryApi.editCategoryById(category._id, formData);
                navigate(PATH_DASHBOARD.category.list);
            } else {
                res = await categoryApi.insert(formData);
                resetForm();
            }
            let { statusText, message } = res;
            // category in recycle bin
            if(statusText === 'info'){
                try {
                    await confirm({
                        title: message,
                        content: <Alert severity={statusText}>Do you want to restore this category ?</Alert>
                    });
                    const deletedItem = res.category;
                    const restore = await categoryApi.restoreByID(deletedItem._id);
                    statusText = restore.statusText;
                    message = restore.message;
                    navigate(PATH_DASHBOARD.category.list);
                } catch (error) {
                    return;
                }
            }
            if(statusText === 'error'){
                try {
                    await confirm({
                        title: message,
                        content: <Alert severity={statusText}>This category is existed</Alert>
                    });
                } catch (error) {
                    return;
                }
            }
        }
    });
    const { values, setFieldValue, getFieldProps, isSubmitting, touched, errors } = formik;
    const handleDropSingle = acceptedFiles => {
        const file = acceptedFiles[0];
        if (file) {
            setFieldValue('image', {
                file,
                preview: URL.createObjectURL(file)
            });
        }
    };
    const handleDropMultiple = acceptedFiles => {
        const files = acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setFieldValue('banners', files);
    };
    const handleRemoveAll = () => {
        setFieldValue('banners', []);
    };

    const handleRemove = file => {
        const filteredFiles = values.banners.filter(_file => _file !== file);
        setFieldValue('banners', filteredFiles);
    };
    return (
        <FormikProvider value={formik}>
            <Form>
                <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ py: 10, px: 3 }}>
                            <div>
                                Image:
                                <UploadSingleFile
                                    accept='image/*'
                                    file={values.image}
                                    onDrop={handleDropSingle}
                                    caption={
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                my: 2,
                                                mx: 'auto',
                                                display: 'block',
                                                textAlign: 'center',
                                                color: 'text.secondary'
                                            }}
                                        >
                                            Allowed *.jpeg, *.jpg, *.png, *.gif
                                            <br />Maximum 3.1MB
                                        </Typography>
                                    }
                                />
                                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                    {Boolean(touched.image && errors.image) && errors.image}
                                </FormHelperText>
                            </div>
                            <div>
                                Banners:
                                <UploadMultipleFile
                                    accept='image/*'
                                    files={values.banners}
                                    showPreview
                                    onDrop={handleDropMultiple}
                                    onRemove={handleRemove}
                                    onRemoveAll={handleRemoveAll}
                                />
                                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                    {Boolean(touched.banners && errors.banners) && errors.banners}
                                </FormHelperText>
                            </div>
                            <Typography variant='caption'>
                                Created at: 2021-11-22T08:34:48.760+00:00
                                <br />
                                Updated at: 2021-11-22T08:34:48.760+00:00
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label='Title'
                                    {...getFieldProps('title')}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                                <TextField
                                    fullWidth
                                    label='Parent ID'
                                    {...getFieldProps('parentId')}
                                    error={Boolean(touched.parentId && errors.parentId)}
                                    helperText={touched.parentId && errors.parentId}
                                />
                                <TextField
                                    fullWidth
                                    label='Display Order'
                                    {...getFieldProps('displayOrder')}
                                    error={Boolean(touched.displayOrder && errors.displayOrder)}
                                    helperText={touched.displayOrder && errors.displayOrder}
                                />
                                <Stack alignItems='end'>
                                    <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                                        {isEdit ? 'Change' : 'Save'}
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
};

export default CategoryForm;
