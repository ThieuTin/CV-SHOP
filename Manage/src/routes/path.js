const path = (root, sublink) => {
    return `${root}${sublink}`;
};

export const ROOT_EXTERNAL = process.env.REACT_APP_CLIENT_URL;

const ROOT_DASHBOARD = '/dashboard';
const ROOT_CATEGORY = '/category';
const ROOT_ACCOUNT = '/account';
const ROOT_PRODUCT = '/product';
const ROOT_ORDER = '/order';
export const PATH_DASHBOARD = {
    root: ROOT_DASHBOARD,
    category: {
        root: ROOT_CATEGORY,
        list: path(ROOT_CATEGORY, '/list'),
        create: path(ROOT_CATEGORY, '/new'),
        edit: path(ROOT_CATEGORY, '/edit')
    },
    account: {
        root: ROOT_ACCOUNT,
        list: path(ROOT_ACCOUNT, '/list'),
        create: path(ROOT_ACCOUNT, '/new')
    },
    product: {
        root: ROOT_PRODUCT,
        list: path(ROOT_PRODUCT, '/list'),
        create: path(ROOT_PRODUCT, '/new')
    },
    order: {
        root: ROOT_ORDER,
        list: path(ROOT_ORDER, '/list')
    }

};
