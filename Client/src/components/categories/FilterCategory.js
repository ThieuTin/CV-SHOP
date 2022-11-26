import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, TextField, Button, Chip } from '@mui/material';
import { ReadMore } from '@mui/icons-material';

import Stars from '../Stars';
import updateQueryParams from '../../utils/updateQueryParams';

const propTypes = {
    children: PropTypes.array,
    queryObject: PropTypes.object
};

const FilterCategory = ({ children, queryObject }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const history = useHistory();
    const { pathname, search } = history.location;
    const handleChangeFrom = e => {
        const value = e.target.value;
        if (!/^\d+$/.test(value)) return;
        setFrom(value);
    };
    const handleChangeTo = e => {
        const value = e.target.value;
        if (!/^\d+$/.test(value)) return;
        setTo(value);
    };
    const handleQueryRating = value => {
        const to = updateQueryParams(pathname + search, {
            ...queryObject,
            rating: value,
        });
        history.replace(to);
    };
    const handleApplyPrice = () => {
        const linkTo = updateQueryParams(pathname + search, {
            ...queryObject,
            price: `${from ? from : '0'}-${to ? to : '0'}`
        });
        history.replace(linkTo);
    };
    const handleQueryPrice = value => {
        const to = updateQueryParams(pathname + search, {
            ...queryObject,
            price: value
        });
        history.replace(to);
    };
    return (
        <RootStyle>
            <Wrapper>
                <Title>Product portfolio</Title>
                {children.map(category => (
                    <Link key={category._id} to={`/${category.slug}/cid${category._id}`}>
                        <Text>{category.title}</Text>
                    </Link>
                ))}
            </Wrapper>
            <Wrapper>
                <Title>Rating</Title>
                <Stack direction='row' alignItems='center'>
                    <Stars total={5} rating={5} />
                    <Text
                        onClick={() => handleQueryRating(5)}
                        sx={{ mx: '4px', my: '2px' }}
                    >
                        5 stars
                    </Text>
                </Stack>
                <Stack direction='row' alignItems='center'>
                    <Stars total={5} rating={4} />
                    <Text
                        onClick={() => handleQueryRating(4)}
                        sx={{ mx: '4px', my: '2px' }}
                    >
                        4 stars
                    </Text>
                </Stack>
                <Stack direction='row' alignItems='center'>
                    <Stars total={5} rating={3} />
                    <Text
                        onClick={() => handleQueryRating(3)}
                        sx={{ mx: '4px', my: '2px' }}
                    >
                        3 stars
                    </Text>
                </Stack>
            </Wrapper>
            <Wrapper>
                <Title>Price</Title>
                <Chip
                    label='Less than 400.000'
                    onClick={() => handleQueryPrice('0-400000')}
                    color='error'
                    variant={queryObject && queryObject.price === '0-400000' ? 'contained' : 'outlined'}
                    sx={{ my: '2px' }}
                />
                <Chip
                    label='From 400.000 to 3.400.000'
                    onClick={() => handleQueryPrice('400000-3400000')}
                    color='error'
                    variant={queryObject && queryObject.price === '400000-3400000' ? 'contained' : 'outlined'}
                    sx={{ my: '2px' }}
                />
                <Chip
                    label='More than 3.400.000'
                    onClick={() => handleQueryPrice('3400000-99999999999')}
                    color='error'
                    variant={queryObject && queryObject.price === '3400000-99999999999' ? 'contained' : 'outlined'}
                    sx={{ my: '2px' }}
                />
                <TextField
                    value={from}
                    label='From'
                    variant='standard'
                    color='error'
                    onChange={handleChangeFrom}
                    sx={{ mx: 1 }}
                />
                <TextField
                    value={to}
                    label='To'
                    variant='standard'
                    color='error'
                    onChange={handleChangeTo}
                    sx={{ mx: 1 }}
                />
                <Button
                    color='error'
                    variant='contained'
                    startIcon={<ReadMore />}
                    sx={{ mt: '10px' }}
                    onClick={handleApplyPrice}
                >
                    Apply
                </Button>
            </Wrapper>
        </RootStyle>
    );
};

const RootStyle = styled(Stack)(({ theme }) => ({
    width: '262px',
    borderRight: `2px solid ${theme.palette.background.default}`,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: '10px'
    }
}));

const Wrapper = styled('div')(({ theme }) => ({
    padding: '10px',
    backgroundColor: theme.palette.background.paper,
    fontSize: '14px',
    borderBottom: `2px solid ${theme.palette.background.default}`
}));

const Title = styled('span')({
    fontWeight: 'bold',
    fontSize: '15px',
    display: 'block'
});

const Text = styled('span')({
    fontSize: '14px',
    margin: '10px 0',
    display: 'block',
    cursor: 'pointer',
    '&:hover': {
        color: '#f53d2d'
    }
});

FilterCategory.propTypes = propTypes;

export default FilterCategory;
