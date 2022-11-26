import axiosInstance from "./axiosInstance";

const productApi = {
  // [POST] baseURL/products
  insertProduct: (body) => {
    const url = "/products";
    return axiosInstance.post(url, body);
  },
  // [GET] baseURL/products
  findAll: () => {
    const url = "/products";
    return axiosInstance.get(url);
  },
  // [GET] baseURL/products/id
  findBySlug: (slug) => {
    const url = `/products/${slug}`;
    return axiosInstance.get(url);
  },
  // [PUT] baseURL/products/:productID
  editProductById: (id, body) => {
    const url = `/products/${id}`;
    return axiosInstance.put(url, body);
  },
  // [DELETE] baseURL/products/:productID
  deleteProductById: (id) => {
    const url = `/products/${id}`;
    return axiosInstance.delete(url);
  },
  // [PATCH] baseURL/products
  deletedProductAll: (productIDs) => {
    const url = `/products/`;
    return axiosInstance.patch(url, { productIDs });
  },
  // [PATCH] baseURL/productsL/:productID
  restoreByID: (id) => {
    const url = `/products/${id}`;
    return axiosInstance.patch(url);
  },
};

export default productApi;
