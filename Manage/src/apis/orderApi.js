import axiosInstance from './axiosInstance';

const orderApi = {
    // [GET] /orders
    findAll: () => {
        const url = '/orders';
        return axiosInstance.get(url);
    },

    // [GET] /orders/:orderId
    findById: orderId => {
        const url = `/orders/${orderId}`;
        return axiosInstance.get(url);
    },

    // [PATCH] /orders/status/:orderId
    switchStatus: orderId => {
        const url = `/orders/status/${orderId}`;
        return axiosInstance.patch(url);
    }
};

export default orderApi;
