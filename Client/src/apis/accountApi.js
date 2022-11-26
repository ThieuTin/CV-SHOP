import axiosInstance from './axiosInstance';

const accountApi = {
    // [GET] /accounts/checkExist/:email
    checkExist: (email) => {
        const url = `/accounts/checkExist/${email}`;
        return axiosInstance.get(url);
    },

    // [GET] /accounts
    listAccounts: () => {
        const url = '/accounts';
        return axiosInstance.get(url);
    },

    // [GET] /accounts/profile
    getProfile: () => {
        const url = '/accounts/profile';
        return axiosInstance.get(url);
    },

    // [PATCH] /accounts/profile
    editProfile: body => {
        const url = '/accounts/profile';
        return axiosInstance.patch(url, body);
    },

    // [POST] /accounts/login
    login: (email, password) => {
        const url = '/accounts/login';
        return axiosInstance.post(url, {
            email,
            password
        });
    },

    // [POST] /accounts/register
    register: (name, email, password, passwordConfirm) => {
        const url = '/accounts/register';
        return axiosInstance.post(url, {
            name,
            email,
            password,
            passwordConfirm
        });
    }
};

export default accountApi;
