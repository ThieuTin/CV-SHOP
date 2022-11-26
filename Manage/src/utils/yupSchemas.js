import * as yup from 'yup';

export const createCategorySchema = yup.object().shape({
    title: yup
        .string()
        .required('Not be empty!'),
    image: yup
        .mixed()
        .required('Not be empty!'),
    banners: yup
        .array()
        .min(1, 'Not be empty!'),
    parentId: yup
        .mixed()
        .required('Not be empty!'),
    displayOrder: yup
        .mixed()
        .required('Not be empty!')
});

export const createAccountSchema = yup.object().shape({
    email: yup
        .string()
        .required('Not be empty!'),
    password: yup
        .string()
        .required('Not be empty!'),
    image: yup
        .mixed()
        .required('Not be empty!'),
    phone: yup
        .string()
        .max(10, 'Max is 10 numbers'),
    role: yup
        .string()
        .required('Not be empty!'),
});
export const createProductSchema = yup.object().shape({
    name: yup
        .string()
        .required('Not be empty!'),
    price: yup
        .number()
        .required('Not be empty!'),
    images: yup
        .array()
        .min(1,'Not be empty!'),
    quantity: yup
        .number()
        .required('Not be empty!'),
    VATFee: yup
        .number()
        .required('Not be empty!'),
    limit: yup
        .number()
        .required('Not be empty!'),
});
