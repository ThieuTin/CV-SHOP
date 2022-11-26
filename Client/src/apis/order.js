import axiosInstance from './axiosInstance';

const orderApi = {
    // [POST] /orders
    insertOrder: body => {
        const url = `/orders`;
        return axiosInstance.post(url, body);
    }
};

export default orderApi;