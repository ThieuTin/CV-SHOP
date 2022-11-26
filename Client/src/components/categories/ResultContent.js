import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Pagination, Chip } from '@mui/material';
import { StarRateTwoTone } from '@mui/icons-material';

import updateQueryParams from '../../utils/updateQueryParams';
import ProductCard from '../ProductCard';
import Slick from '../slick/Slick';
import { settingBanners } from '../slick/SlickSettings';
import { HEADER_HEIGHT } from '../../constant';
import { toVND } from '../../utils/formatMoney';

const propTypes = {
    response: PropTypes.object,
    queryObject: PropTypes.object
};

const FILTER_NAVS = [
    {
        label: 'Popular',
        sort: 'default'
    },
    {
        label: 'Hot selling',
        sort: 'top_seller'
    },
    {
        label: 'Newest',
        sort: 'newest'
    },
    {
        label: 'Cheap',
        sort: 'price-asc'
    },
    {
        label: 'Expensive',
        sort: 'price-desc'
    }
];

const ResultContent = ({ response, queryObject }) => {
    const { category, result } = response;
    const { products, totalProduct, pagination, filter } = result;
    const history = useHistory();
    const { pathname, search } = history.location;
    const chips = Object.keys(queryObject)
        .filter(key => key !== 'sort' && key !== 'page')
        .map(key => {
            let label = '';
            switch (key) {
                case 'rating':
                    label = queryObject[key] + ' stars';
                    break;
                case 'price':
                    const [from, to] = queryObject[key].split('-');
                    (from === '0' && to === '400000')
                        ? label = `Less than ${toVND(400000)}`
                        : (from === '3400000' && to === '99999999999')
                            ? label = `More than ${toVND(3400000)}`
                            : label = `From ${toVND(parseInt(from))} to ${toVND(parseInt(to))} `
                    break;
                default:
                    break;
            }
            return { key, label };
        });
    const handleFilter = sort => {
        history.replace(`?sort=${sort}&page=1`);
        window.scrollTo(0, 0);
    };
    const handlePagination = (event, value) => {
        const to = updateQueryParams(pathname + search, {
            page: value
        });
        history.replace(to);
        window.scrollTo(0, 0);
    };
    const handleDeleteChip = key => {
        const search = new URLSearchParams(history.location.search);
        if (key === 'all') {
            Object.keys(queryObject)
                .filter(key => key !== 'sort' && key !== 'page')
                .forEach(key => search.delete(key))
        } else {
            search.delete(key);
        }
        const to = `${pathname}?${search.toString()}`;
        history.replace(to);
        window.scrollTo(0, 0);
    };
    return (
        <RootStyle>
            <Stack direction='row' alignItems='center' spacing={1} sx={{ m: '15px' }}>
                <Typography variant='h6'>{category.title}: </Typography>
                <Typography variant='subtitle1' fontSize='17px'>{totalProduct}</Typography>
            </Stack>
            <Stack sx={{ mb: '20px' }}>
                <Slick settings={settingBanners}>
                    {category.banners && category.banners.map((image, index) => (
                        <Image key={index} src={image} alt="" />
                    ))}
                </Slick>
            </Stack>
            <Stack sx={{ position: 'relative' }}>
                <FilterWrapper direction='row' alignItems='center'>
                    {FILTER_NAVS.map(nav => (
                        <FilterText
                            key={nav.label}
                            className={nav.sort === filter.sort ? 'active' : ''}
                            onClick={() => handleFilter(nav.sort)}
                        >
                            {nav.label}
                        </FilterText>
                    ))}
                </FilterWrapper>
                {chips.length !== 0 && (
                    <Stack direction='row' alignItems='center' spacing={1} sx={{ m: 2 }}>
                        {chips.map(chip => (
                            <Chip
                                key={chip.key}
                                label={chip.label}
                                color='error'
                                size='small'
                                onDelete={() => handleDeleteChip(chip.key)}
                            />
                        ))}
                        <Typography
                            variant='subtitle2'
                            color='error'
                            onClick={() => handleDeleteChip('all')}
                            sx={{ cursor: 'pointer' }}
                        >Remove all</Typography>
                    </Stack>
                )}
                {totalProduct > 0 && (
                    <Wrapper>
                        {products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </Wrapper>
                )}
                {totalProduct <= 0 && (
                    <Stack alignItems='center' spacing={1} sx={{ width: '100%', py: 3 }}>
                        <StarRateTwoTone color='warning' sx={{ fontSize: 'xxx-large' }} />
                        <Typography variant='subtitle1'>No product found :D. Try something new.</Typography>
                    </Stack>
                )}
            </Stack>
            <PaginationWrapper>
                <Pagination
                    color='error'
                    page={parseInt(pagination.page)}
                    count={pagination.totalPage}
                    hidePrevButton={pagination.page <= 1}
                    hideNextButton={pagination.page >= pagination.totalPage}
                    onChange={handlePagination}
                />
            </PaginationWrapper>
        </RootStyle>
    );
};

const RootStyle = styled(Stack)(({ theme }) => ({
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

const Image = styled('img')({
    width: '100%',
    height: '100%'
});

const FilterWrapper = styled(Stack)(({ theme }) => ({
    borderTop: `2px solid ${theme.palette.background.default} `,
    position: 'sticky',
    top: HEADER_HEIGHT,
    zIndex: '99',
    backgroundColor: theme.palette.background.paper
}));

const FilterText = styled('span')({
    textTransform: 'capitalize',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '0 16px',
    padding: '8px',
    '&:hover, &.active': {
        color: '#f53d2d',
        borderBottom: '4px solid #f53d2d'
    }
});

const PaginationWrapper = styled('div')(({ theme }) => ({
    marginTop: '15px',
    height: '50px',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

ResultContent.propTypes = propTypes;

export default ResultContent;
