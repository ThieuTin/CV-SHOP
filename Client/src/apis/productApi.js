import axiosInstance from './axiosInstance';

const productApi = {
    // [GET] /products
    listProducts: (page, number) => {
        const url = `/products/${page}/${number}`;
        return axiosInstance.get(url);
    },

    // [GET] /products/top/:type/:number
    topProducts: (type, number) => {
        const url = `/products/top/${type}/${number}`;
        return axiosInstance.get(url);
    },

    // [GET] /products/similar/:productId/:number
    similarProducts: (productId, number) => {
        const url = `/products/similar/${productId}/${number}`;
        return axiosInstance.get(url);
    },

    // [POST] /products/c
    listProductsByCategory: (queries) => {
        const url = '/products/c';
        return axiosInstance.post(url,{
            ...queries
        });
    },

    // [GET] /products/:slugProduct
    getProduct: (slugProduct) => {
        const url = `/products/${slugProduct}`;
        return axiosInstance.get(url);
    }
};

export default productApi;
