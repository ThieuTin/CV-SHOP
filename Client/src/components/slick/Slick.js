import PropTypes from 'prop-types';
import Slider from 'react-slick';

const propTypes = {
    children: PropTypes.node,
    settings: PropTypes.object
};

const Slick = ({ children, settings }) => (
    <Slider {...settings }>
        {children}
    </Slider>
);

Slick.propTypes = propTypes;

export default Slick;
