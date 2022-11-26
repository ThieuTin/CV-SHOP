import axiosInstance from './axiosInstance';

const categoryApi = {
    // [GET] /categories
    listCategory: () => {
        const url = '/categories';
        return axiosInstance.get(url);
    },

    // [GET] /categories/:slugCategory
    getCategory: (slugCategory) => {
        const url = `/categories/${slugCategory}`;
        return axiosInstance.get(url);
    }
};

export default categoryApi;
