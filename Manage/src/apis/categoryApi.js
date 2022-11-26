import axiosInstance from './axiosInstance';

const categoryApi = {
    // [GET] /categories
    findAll: () => {
        const url = '/categories';
        return axiosInstance.get(url);
    },
    // [GET] baseURL/categories/:slugCategory
    findBySlug: slugCategory => {
        const url = `/categories/${slugCategory}`;
        return axiosInstance.get(url);
    },
    // [POST] /categories
    insert: (body) => {
        const url = '/categories';
        return axiosInstance.post(url, body);
    },
    // [PUT] /categories 
    editCategoryById: (id, body)=>{
        const url = `/categories/${id}`; 
        return axiosInstance.put(url, body);
    },
    // [DELETE] baseURL/categories/:categoryID
    deleteCategorybyID: (id) => {
        const url = `/categories/${id}`;
        return axiosInstance.delete(url);
    },
    // [PATCH] baseURL/categories
    deletedCategoryAll: (categoryIDs) => {
        const url = `/categories/`;
        return axiosInstance.patch(url, { categoryIDs });
    },
    // [PATCH] baseURL/categories/:categoryID
    restoreByID: (id) => {
        const url = `/categories/${id}`;
        return axiosInstance.patch(url);
    },
};

export default categoryApi;
