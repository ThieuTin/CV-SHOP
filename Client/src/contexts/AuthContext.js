import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import accountApi from '../apis/accountApi';
import { getToken, setToken, isValidToken } from '../utils/jwt';
import { getProfile, removeUser } from '../redux/slices/user';
import { getCart, deleteCart } from '../redux/slices/cart';

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    role: ''
};

const handlers = {
    INITIALIZE: (state, action) => {
        const isAuthenticated = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true
        }
    },
    LOGIN: (state, action) => {
        return {
            ...state,
            isAuthenticated: true,
            role: action.payload
        }
    },
    LOGOUT: (state) => {
        return {
            ...state,
            isAuthenticated: false
        }
    }
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

const propTypes = {
    children: PropTypes.node
};

const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
});

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchSlice = useDispatch();
    useEffect(() => {
        const initialize = async () => {
            try {
                const tokens = getToken();
                setToken(tokens);
                const isAuthenticated = await isValidToken(tokens);
                if (isAuthenticated) {
                    await dispatchSlice(getProfile());
                    await dispatchSlice(getCart());
                }
                dispatch({
                    type: 'INITIALIZE',
                    payload: isAuthenticated
                });
            } catch (error) {
                console.log(error);
            }
        };
        initialize();
    }, [dispatchSlice]);
    const login = async (email, password) => {
        const res = await accountApi.login(email, password);
        const { role, tokens } = res;
        setToken(tokens);
        if (role !== 'Admin') {
            await dispatchSlice(getProfile());
            await dispatchSlice(getCart());
        }
        dispatch({
            type: 'LOGIN',
            role
        });
        return role;
    };
    const register = async (name, email, password, passwordConfirm) => {
        return await accountApi.register(name, email, password, passwordConfirm);
    };
    const logout = async () => {
        setToken(null);
        dispatch({
            type: 'LOGOUT'
        });
        dispatchSlice(removeUser());
        dispatchSlice(deleteCart());
    };
    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = propTypes;

export { AuthProvider, AuthContext };
