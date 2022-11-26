import PropTypes from 'prop-types';

import CheckoutHeader from './CheckoutHeader';
import CheckoutFooter from './CheckoutFooter';

const propTypes = {
    children: PropTypes.node
};

const CheckoutLayout = ({ children }) => (
    <>
        <CheckoutHeader />
        {children}
        <CheckoutFooter />
    </>
);

CheckoutLayout.propTypes = propTypes;

export default CheckoutLayout;
