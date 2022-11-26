import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
// import { createContext, useEffect, useReducer } from 'react';
// import { useDispatch } from 'react-redux';

// slices
// import { getProjects } from '../redux/slices/project';
// import { getTypes } from '../redux/slices/projectType';
// import { getTeams } from '../redux/slices/team';
// import { getAccounts } from '../redux/slices/account';

const initialState = {
    isInitialized: false
};

const handlers = {
    INITIALIZE: (state, action) => {
        return {
            ...state,
            isInitialized: true
        }
    }
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

const propTypes = {
    children: PropTypes.node
};

const AuthContext = createContext({
    ...initialState
});

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const dispatchSlice = useDispatch();
    // useEffect(() => {
    //     const initialize = async () => {
    //         try {
    //             await dispatchSlice(getProjects());
    //             await dispatchSlice(getTypes());
    //             await dispatchSlice(getTeams());
    //             await dispatchSlice(getAccounts());
    //             dispatch({
    //                 type: 'INITIALIZE'
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     initialize();
    // }, [dispatchSlice]);
    return (
        <AuthContext.Provider
            value={{
                ...state
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = propTypes;

export { AuthProvider, AuthContext };
