import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
};

const Page = ({ children, title = 'Architecture Manager' }) => (
    <>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        {children}
    </>
);

Page.propTypes = propTypes;

export default Page;
