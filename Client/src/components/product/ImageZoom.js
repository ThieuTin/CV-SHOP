import PropTypes from 'prop-types';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const propTypes = {
    image: PropTypes.array
};

const ImageZoom = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    return (
        <RootStyle>
            <MainImage src={images[currentImage]} alt="" />
            <Stack direction='row' spacing={1} sx={{ mt: '3px' }}>
                {images && images.map((image, index) => (
                    <MoreImage
                        key={index}
                        className={index === currentImage ? 'active' : ''}
                        src={image}
                        alt=""
                        onClick={() => setCurrentImage(index)}
                    />
                ))}
            </Stack>
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    width: '450px',
    padding: '15px',
    borderRight: `2px solid ${theme.palette.background.default}`,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderBottom: `2px solid ${theme.palette.background.default}`
    }
}));

const MainImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: '370px',
    borderBottom: `3px solid ${theme.palette.background.default}`,
    borderRadius: '5px'
}));

const MoreImage = styled('img')({
    width: '72px',
    height: '67px',
    backgroundSize: '100% auto',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
        border: '1px solid gray',
        borderRadius: '5px'
    },
    '&.active': {
        border: '1px solid #f53d2d',
        borderRadius: '5px'
    }
});

ImageZoom.propTypes = propTypes;

export default ImageZoom;
