import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import { Typography, Stack, Button } from '@mui/material';
import { Favorite, AddShoppingCart, LocalShipping } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import Stars from '../Stars';
import { toVND } from '../../utils/formatMoney';
import { getToken } from '../../utils/jwt';
import { addCart } from '../../redux/slices/cart';
import { PATH_AUTH } from '../../routes/path';

const propTypes = {
    product: PropTypes.object
};

const Information = ({ product }) => {
    const [input, setInput] = useState('1');
    const dispatch = useDispatch();
    const history = useHistory();
    const tokens = getToken();
    const { _id, rating, name, sold, discount, price, warranty } = product;
    const handleChange = e => {
        const value = e.target.value;
        if (!/^\d+$/.test(value)) return;
        setInput(value);
    };
    const handleAddCart = () => {
        if (tokens) {
            dispatch(addCart({
                productId: _id,
                quantity: parseInt(input)
            }));
        } else {
            const { pathname } = history.location;
            history.push(PATH_AUTH.login, { from: pathname });
        }
    };
    return (
        <RootStyle>
            <Typography variant='h6'>
                {name}
            </Typography>
            <Stack direction='row' alignItems='center' sx={{ my: '3px' }}>
                {rating && rating.total > 0 && <Stars total={5} rating={rating.average} sx={{ fontSize: '16px' }} />}
                <Typography variant='subtitle1' sx={{ mx: '5px', fontSize: '15px' }}>
                    {rating && rating.total > 0 && `(From ${rating.total} ratings) | `}
                    {sold !== 0 && `${sold} sold`}
                </Typography>
                <LocalShipping fontSize='small' color='error' />
            </Stack>
            <PriceWrapper>
                <PriceText>
                    {discount === 0
                        ? toVND(price)
                        : toVND(price - price * discount / 100)
                    }
                </PriceText>
                {discount !== 0 && (
                    <Typography component='span'>
                        <Typography
                            component='span'
                            sx={{ color: '#efefef', fontSize: '15px', textDecoration: 'line-through', mx: '5px' }}
                        >
                            {toVND(price)}
                        </Typography>
                        -{discount}%
                    </Typography>
                )}
            </PriceWrapper>
            <Stack sx={{ mb: '35px' }}>
                {warranty && warranty.map((item, index) => (
                    <Typography component='span' key={index}>
                        <Typography
                            component='span'
                            sx={{ color: 'rgb(120, 120, 120)', fontSize: '15px', mx: '5px' }}
                        >
                            {item.title}:
                        </Typography>
                        {item.text}
                    </Typography>
                ))}
            </Stack>
            <Stack direction='row' alignItems='center' sx={{ my: 3 }}>
                <ButtonQ
                    className={`quantity-button ${parseInt(input) === 1 ? 'disabled' : ''}`}
                    onClick={() => setInput(parseInt(input) - 1)}
                >-</ButtonQ>
                <input
                    type="text"
                    className="quantity-input"
                    value={input}
                    onChange={handleChange}
                />
                <ButtonQ
                    className="quantity-button"
                    onClick={() => setInput(parseInt(input) + 1)}
                >+</ButtonQ>
            </Stack>
            <Stack direction='row' alignItems='center' sx={{ my: 3 }} spacing={1}>
                <Button
                    variant='contained'
                    endIcon={<AddShoppingCart />}
                    color='error'
                    onClick={handleAddCart}
                >
                    ADD TO CART
                </Button>
                <Button
                    variant='contained'
                    endIcon={<Favorite />}
                    color='secondary'
                >
                    ADD TO FAVOTITES
                </Button>
            </Stack>
        </RootStyle>
    );
}

const RootStyle = styled('div')(({ theme }) => ({
    width: 'calc(100% - 450px)',
    padding: '15px',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}));

const PriceWrapper = styled('div')({
    width: '80%',
    background: 'linear-gradient(100deg,rgb(255, 66, 78),rgb(253, 130, 10))',
    borderRadius: '5px',
    padding: '15px',
    margin: '20px 0',
    textAlign: 'center',
    color: '#fff'
});

const PriceText = styled('span')({
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'block'
});

const ButtonQ = styled('button')({
    cursor: 'pointer',
    width: '30px',
    '&.disabled': {
        pointerEvents: 'none !important'
    },
    '&:hover': {
        border: '1px solid #2195f3'
    }
});

Information.propTypes = propTypes;

export default Information;
