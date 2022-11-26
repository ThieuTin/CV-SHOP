import { useState, useEffect } from 'react';

import productApi from '../apis/productApi';

const useInfiniteProduct = (page, number) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        const getProducts = async () => {
            try {
                setIsLoading(true);
                setError(false);
                const res = await productApi.listProducts(page, number);
                setProducts(prevProducts => {
                    return [...prevProducts, ...res.products]
                });
                setIsLoading(false);
                setHasMore(page < res.pagination.totalPage);
            } catch (error) {
                setError(true);
            }
        };
        getProducts();
    }, [page, number]);
    return { isLoading, error, hasMore, products };
};

export default useInfiniteProduct;