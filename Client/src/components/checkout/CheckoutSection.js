import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

// apis
import orderApi from '../../apis/order';
// hooks
import useSnackbar from '../../hooks/useSnackbar';
// slices
import { removeCart } from '../../redux/slices/cart';
// path
import { PATH_CHECKOUT, PATH_PAGE } from '../../routes/path';
// 
import Delivery from './Delivery';
import Payment from './Payment';

const propTypes = {
    user: PropTypes.object,
    cart: PropTypes.array
};

const CheckoutSection = ({ user, cart }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { setSnackbar } = useSnackbar();
    const cartChecked = cart.filter(item => item.checked);
    const isFilledInfor = user.phone !== '' || user.address !== '';
    const handleOrder = async () => {
        if (!isFilledInfor) {
            history.replace(PATH_CHECKOUT.shipping);
            return;
        }
        if (cartChecked.length <= 0) {
            history.replace(PATH_PAGE.cart);
            return;
        }
        const res = await orderApi.insertOrder({
            customerName: user.name,
            customerPhone: user.phone,
            customerAddress: user.address,
            ordered: cartChecked
        });
        const { statusText, message } = res;
        if (statusText === 'success') {
            dispatch(removeCart(null));
            history.replace(PATH_PAGE.home);
        }
        setSnackbar({
            isOpen: true,
            type: statusText,
            message: message
        });
    };
    return (
        <RootStyle>
            <Delivery cart={cartChecked} />
            <Payment />
            <Stack>
                <Button variant='contained' color='error' onClick={handleOrder}>Order</Button>
                <Typography variant='caption'>(Please double check your order before placing an order)</Typography>
            </Stack>
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    width: '815px',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}));

CheckoutSection.propTypes = propTypes;

export default CheckoutSection;
