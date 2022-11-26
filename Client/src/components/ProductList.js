import PropTypes from 'prop-types';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Skeleton, CircularProgress } from '@mui/material';

import Title from './Title';
import ProductCard from './ProductCard';
import useInfiniteProduct from '../hooks/useInfiniteProduct';

const propTypes = {
    id: PropTypes.string
};

const SkeletonLoad = [...Array(10)].map((_, index) => (
    <Stack key={index} sx={{ p: 2 }} >
        <Skeleton variant='rectangular' width={180} height={180} />
        <Skeleton variant='text' height={45} />
        <Skeleton variant='text' width={150} />
        <Skeleton variant='text' width={130} />
    </Stack>
));

const ProductList = ({ id }) => {
    const [page, setPage] = useState(1);
    const { isLoading, error, hasMore, products } = useInfiniteProduct(page, 10);
    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };
    return (
        <Stack id={id}>
            <Title>Suggestions for you</Title>
            <Wrapper>
                {products.length !== 0 && (
                    <>
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}

                        <LoadMore>
                            {!isLoading && hasMore && (
                                <LoadButton onClick={handleLoadMore}>
                                    <Typography variant="subtitle2">
                                        Load more
                                    </Typography>
                                </LoadButton>
                            )}
                            {isLoading && <CircularProgress size={25} color='error' />}
                        </LoadMore>

                        {error && <Typography color='error' variant='subtitle2'>Could't load the products</Typography>}
                    </>
                )}

                {products.length === 0 && SkeletonLoad}
            </Wrapper>
        </Stack>
    );
};

const Wrapper = styled('div')({
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '50px'
});

const LoadMore = styled('div')({
    position: 'absolute',
    bottom: '-70px',
    left: '30%',
    width: '40%',
    height: '50px',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const LoadButton = styled('div')(({ theme }) => ({
    width: '100%',
    padding: '15px',
    borderRadius: '15px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '5px 3px 7px rgb(145 158 171 / 24%)',
    transition: '0.5s',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        color: '#fff',
        backgroundColor: '#f76254'
    }
}));

ProductList.propTypes = propTypes;

export default ProductList;
