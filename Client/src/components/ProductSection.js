import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Skeleton } from '@mui/material';

import Title from './Title';
import Slick from './slick/Slick';
import { settingProductSection } from './slick/SlickSettings';
import ProductCard from './ProductCard';
import productApi from '../apis/productApi';

const propTypes = {
    id: PropTypes.string,
    _id: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    sx: PropTypes.object
};

const SkeletonLoad = [...Array(5)].map((_, index) => (
    <Stack key={index} sx={{ p: 2 }} >
        <Skeleton variant='rectangular' width={180} height={180} />
        <Skeleton variant='text' height={45} />
        <Skeleton variant='text' width={150} />
        <Skeleton variant='text' width={130} />
    </Stack>
));

const ProductSection = ({ id, _id, type, title, sx }) => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        const getTopProducts = async () => {
            try {
                let products = [];
                if (type === 'similar') {
                    products = await productApi.similarProducts(_id, 10);
                } else {
                    products = await productApi.topProducts(type, 10);
                }
                setProducts(products);
            } catch (error) {
                console.log(error);
            }
        };
        getTopProducts();
    }, [type, _id]);
    return (
        <RootStyle id={id} sx={{ ...sx }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title>{title}</Title>
                <Link to='/auth' underline="hover">
                    <Title sx={{ color: '#f53d2d' }}>View more</Title>
                </Link>
            </Box>
            <Slick settings={settingProductSection}>
                {products && products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
                {!products && SkeletonLoad}
            </Slick>
        </RootStyle >
    );
};

const RootStyle = styled('div')({
    margin: '30px 0'
});

ProductSection.propTypes = propTypes;

export default ProductSection;
