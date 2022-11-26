import axiosInstance from "./axiosInstance";

const accountApi = {
  // [GET] baseURL/accounts
  findAll: () => {
    const url = "/accounts";
    return axiosInstance.get(url);
  },
  // [GET] baseURL/accounts/id
  findById: (id) => {
    const url = `/accounts/${id}`;
    return axiosInstance.get(url);
  },

  // [PUT] baseURL/accounts
  insert: (body) => {
    const url = "/accounts";
    return axiosInstance.post(url, body);
  },
  edit: (id, body) => {
    const url = `/accounts/${id}`;
    return axiosInstance.put(url, body);
  },
  // [DELETE] baseURL/:accountID
  deletebyID: (id) => {
    const url = `/accounts/${id}`;
    return axiosInstance.delete(url);
  },
  deletedAll: (accountIDs) => {
    const url = `/accounts/`;
    return axiosInstance.patch(url, { accountIDs });
  },
  restoreByID: (id) => {
    const url = `/accounts/${id}`;
    return axiosInstance.patch(url);
  },
};

export default accountApi;
