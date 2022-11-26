import PropTypes from 'prop-types';

import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

const propTypes = {
    children: PropTypes.node
};

const MainLayout = ({ children }) => (
    <>
        <MainHeader />
            {children}
        <MainFooter />
    </>
);

MainLayout.propTypes = propTypes;

export default MainLayout;
