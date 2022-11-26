import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object
};

const Title = ({ children, sx }) => (
    <RootStyle sx={{ ...sx }}>
        {children}
    </RootStyle>
);

const RootStyle = styled('span')({
    fontSize: '16px',
    fontWeight: '500',
    padding: '15px 20px'
});

Title.propTypes = propTypes;

export default Title;
