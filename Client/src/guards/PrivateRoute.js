import { Route, Redirect, useLocation } from 'react-router-dom';

import { PATH_AUTH } from '../routes/path';
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    return <Route {...rest} render={props => (
        isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{
                pathname: PATH_AUTH.login,
                state: { from: pathname }
            }} />
    )} />
};

export default PrivateRoute;
