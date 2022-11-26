const path = (root, sublink) => {
    return `${root}${sublink}`;
};

export const ROOT_EXTERNAL = process.env.REACT_APP_MANAGE_URL;

const ROOT_AUTH = '/auth';
const ROOT_CHECKOUT = '/checkout';

export const PATH_AUTH = {
    root: ROOT_AUTH,
    login: path(ROOT_AUTH, '/login'),
    register: path(ROOT_AUTH, '/register')
};

export const PATH_CHECKOUT = {
    shipping: path(ROOT_CHECKOUT, '/shipping'),
    payment: path(ROOT_CHECKOUT, '/payment')
};

export const PATH_PAGE = {
    home: '/',
    cart: '/cart',
    category: '/:slugCategory',
    detail: '/:slugProduct'
};