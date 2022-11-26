import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Checkbox, Typography, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { DeleteForeverOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { toVND } from '../../utils/formatMoney';
import { updateQuantity } from '../../redux/slices/cart';
import useModal from '../../hooks/useModal';
import useSnackbar from '../../hooks/useSnackbar';

const propTypes = {
    item: PropTypes.object,
    onChange: PropTypes.func,
    onRemove: PropTypes.func
};

const CartItem = ({ item, onChange, onRemove }) => {
    const [input, setInput] = useState(item.amount.toString());
    const { setModal } = useModal();
    const { setSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { _id, images, name, slug, price, discount, quantity, amount, checked, limit } = item;
    const handleChange = e => {
        const value = e.target.value;
        if (!/^\d+$/.test(value)) return;
        setInput(value);
        dispatch(updateQuantity({
            cartId: _id,
            amount: parseInt(value),
            volatility: null
        }));
    };
    const handleDecrease = () => {
        if (amount - 1 < 1) {
            setModal({
                isOpen: true,
                _id,
                title: 'Are you sure you wanna remove these products?',
                content: 'The products will be permanently removed from the cart!',
                type: 'error',
                caseSubmit: 'remove/cart'
            });
            return;
        }
        dispatch(updateQuantity({
            cartId: _id,
            amount: 1,
            volatility: 'dec'
        }));
    };
    const handleIncrease = () => {
        if (amount + 1 > quantity) {
            setSnackbar({
                isOpen: true,
                type: null,
                message: `The remaining quantity of the product is ${quantity}`
            });
            return;
        } else if (limit !== 0 && amount + 1 > limit && limit <= quantity) {
            setSnackbar({
                isOpen: true,
                type: null,
                message: `Maximum purchase quantity for this product is ${limit}`
            });
            return;
        }
        dispatch(updateQuantity({
            cartId: _id,
            amount: 1,
            volatility: 'inc'
        }));
    };
    return (
        <Stack direction='row' alignItems='center' sx={{ py: '30px', borderBottom: (theme) => `2px solid ${theme.palette.background.default}` }}>
            <Stack className="cart-col-1" direction='row' alignItems='center'>
                <Checkbox
                    size='small'
                    checked={checked}
                    checkedIcon={<Favorite />}
                    onChange={e => onChange(_id, e)}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                />
                <Image src={images[0]} />
                <Link to={`/${slug}/pid=${_id}`}>
                    <Name>{name}</Name>
                </Link>
            </Stack>
            <Stack>
                <Typography className='cart-col-2' variant='subtitle2'>
                    {discount === 0
                        ? toVND(price)
                        : toVND(price - price * discount / 100)
                    }
                </Typography>
                {discount !== 0 && (
                    <Stack className="cart-col-2" direction='row' alignItems='center' spacing={1}>
                        <Typography variant='subtitle2' component='span' sx={{ fontSize: '12px', textDecoration: 'line-through' }}>
                            {toVND(price)}
                        </Typography>
                        <SaleTag>-{discount}%</SaleTag>
                    </Stack>
                )}
            </Stack>
            <Stack className='cart-col-3'>
                <Stack direction='row' alignItems='center'>
                    <Button
                        className='quantity-button'
                        onClick={handleDecrease}
                    >-</Button>
                    <input
                        className='quantity-input'
                        type='text'
                        value={amount}
                        onChange={handleChange} />
                    <Button
                        className={`quantity-button ${(limit !== 0 && amount >= limit) || amount >= quantity ? 'disabled' : ''}`}
                        onClick={handleIncrease}
                    >+</Button>
                </Stack>
                {quantity <= 5 && <Typography variant='caption' color='error'>Only {quantity} left</Typography>}
            </Stack>
            <Typography className='cart-col-4' variant='subtitle2' color='error' sx={{ fontWeight: 'bold' }}>
                {toVND(amount * (price - (price * discount / 100)))}
            </Typography>
            <IconButton className='cart-col-5' color='error' onClick={() => onRemove(_id)}>
                <DeleteForeverOutlined />
            </IconButton>
        </Stack>
    )
};

const Image = styled('img')({
    width: '80px',
    height: '80px',
    marginRight: '10px',
    borderRadius: '5px'
});

const Name = styled('span')({
    fontSize: '14px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '&:hover': {
        color: '#f53d2d'
    }
});

const Button = styled('button')({
    cursor: 'pointer',
    width: '30px',
    '&.disabled': {
        cursor: 'default'
    },
    '&:hover': {
        border: '1px solid #2195f3'
    },
    '&.disabled:hover': {
        border: '1px solid red'
    }
});

const SaleTag = styled('div')({
    padding: '0px 2px',
    fontSize: '12px',
    fontWeight: '400',
    border: '1px solid rgb(255, 66, 78)',
    borderRadius: '2px',
    backgroundColor: 'rgb(255, 240, 241)',
    color: 'rgb(255, 66, 78)'
});

CartItem.propTypes = propTypes;

export default CartItem;
