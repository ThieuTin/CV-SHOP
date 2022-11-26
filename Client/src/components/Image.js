import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    sx: PropTypes.object,
    children: PropTypes.node
};

const Image = ({ src, alt, sx, children }) => (
    <RootStyle sx={sx && { ...sx }}>
        <Img src={src} alt={alt} />
        {children}
    </RootStyle>
);

const RootStyle = styled('div')({
    position: 'relative',
    overflow: 'hidden'
});

const Img = styled('img')({
    width: '100%',
    height: '100%',
    backgroundSize: '100% auto'
});

Image.propTypes = propTypes;

export default Image;
