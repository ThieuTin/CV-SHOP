import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

// apis
import axiosInstance from '../apis/axiosInstance';
// path
import { ROOT_EXTERNAL } from '../routes/path';

const rolesAllowed = ['Admin'];

const RoleGuard = ({ children }) => {
    const [role, setRole] = useState(null);
    const token = Cookies.get('accessToken');
    const tokens = token ? JSON.parse(token) : null;
    useEffect(() => {
        const getRole = async () => {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
            const role = await axiosInstance.get('/accounts/role-guard');
            setRole(role);
        }
        getRole();
    }, [tokens?.accessToken]);
    if (!tokens) {
        window.location.href = `${ROOT_EXTERNAL}/auth/login`;
        return null;
    }
    return (
        <>
            {role && (
                rolesAllowed.includes(role)
                    ? <>{children}</>
                    : <Navigate
                        to='/404'
                    />
            )}
            {!role && 'Loading...'}
        </>
    )
};

export default RoleGuard;
