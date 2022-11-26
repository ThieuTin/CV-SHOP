import { Link } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, Breadcrumbs, Typography, Stack, Skeleton } from '@mui/material';
import queryString from 'query-string';

import Page from '../components/Page';
import { PATH_PAGE } from '../routes/path';
import Teleport from '../components/Teleport';
import { FilterCategory, ResultContent } from '../components/categories';
import categoryApi from '../apis/categoryApi';
import productApi from '../apis/productApi';

const Categories = () => {
    const [response, setResonse] = useState(null);
    const { slugCategory } = useParams();
    const queryParams = new URLSearchParams(useLocation().search).toString();
    const parsedQueries = queryString.parse(queryParams ? queryParams : 'sort=default&page=1');
    useEffect(() => {
        const getCategory = async () => {
            try {
                const category = await categoryApi.getCategory(slugCategory);
                const result = await productApi.listProductsByCategory({
                    categoryId: category._id, //cateId
                    ...parsedQueries, //queries filter
                    take: 16 //take quantity
                });
                setResonse({
                    category,
                    result
                });
            } catch (error) {
                console.log(error);
            }
        };
        getCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slugCategory]);
    return (
        <Page title={`Buy online ${response ? response.category.title : ''} good price | CV Shop`}>
            <Container className='wide-container'>
                <Teleport />
                {response && (
                    <Fragment>
                        <StyledBreadcrumbs separator='›'>
                            <Link to={PATH_PAGE.home} style={{ fontSize: '15px' }}>
                                Home
                            </Link>
                            {response.category.parents && response.category.parents.map(category => (
                                <Link key={category._id} to={`/${category.slug}/cid${category._id}`} style={{ fontSize: '15px' }}>
                                    {category.title}
                                </Link>
                            )).reverse()}
                            <Typography fontSize='15px' color='text.primary'>
                                {response.category.title}
                            </Typography>
                        </StyledBreadcrumbs>
                        <Stack direction={{ xs: 'column', sm: 'row', lg: 'row' }} justifyContent='space-between'>
                            <FilterCategory children={response.category.children} queryObject={parsedQueries} />
                            <ResultContent response={response} queryObject={parsedQueries} />
                        </Stack>
                    </Fragment>
                )}

                {!response && (
                    <Stack direction={{ xs: 'column', sm: 'row', lg: 'row' }} justifyContent='space-between'>
                        <FilterSkeleton>
                            {[...Array(3)].map((_, index) => (
                                <Stack key={index} sx={{ mb: 3 }}>
                                    <Skeleton variant='text' height={50} />
                                    {[...Array(4)].map((_, index) => (
                                        <Fragment key={index}>
                                            <Skeleton variant='text' />
                                            <Skeleton variant='text' width={200} />
                                        </Fragment>
                                    ))}
                                </Stack>
                            ))}
                        </FilterSkeleton>
                        <ResultSkeleton>
                            <Skeleton variant='text' width={300} height={50} />
                            <Skeleton variant='text' height={50} />
                            <Wrapper>
                                {[...Array(12)].map((_, index) => (
                                    <Stack key={index} sx={{ p: 2 }} >
                                        <Skeleton variant='rectangular' width={180} height={180} />
                                        <Skeleton variant='text' height={45} />
                                        <Skeleton variant='text' width={150} />
                                        <Skeleton variant='text' width={130} />
                                    </Stack>
                                ))}
                            </Wrapper>
                        </ResultSkeleton>
                    </Stack>
                )}
            </Container>
        </Page>
    );
};

const StyledBreadcrumbs = styled(Breadcrumbs)({
    paddingBottom: '10px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '& ol, & li, p': {
        display: 'inline'
    }
});

const FilterSkeleton = styled(Stack)(({ theme }) => ({
    width: '262px',
    borderRight: `2px solid ${theme.palette.background.default}`,
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: '10px'
    }
}));

const ResultSkeleton = styled(Stack)(({ theme }) => ({
    padding: '15px',
    width: 'calc(100% - 262px)',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}));

const Wrapper = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
});

export default Categories;
