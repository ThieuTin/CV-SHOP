import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, Typography, Link } from '@mui/material';

// path
import { PATH_CHECKOUT, PATH_PAGE } from '../../routes/path';
// utils
import { toVND } from '../../utils/formatMoney';

const propTypes = {
    user: PropTypes.object,
    cart: PropTypes.array
};

const CheckoutInfor = ({ user, cart }) => {
    const isChecked = cart.filter(item => item.checked).length !== 0;
    const totalPrice = cart.reduce((sum, item) => {
        if (item.checked) {
            return sum + (item.amount * (item.price - (item.price * item.discount / 100)));
        }
        return sum;
    }, 0);
    const totalCoupon = 0;
    const totalVAT = cart.reduce((sum, item) => {
        if (item.checked) {
            return sum + item.VATFee;
        }
        return sum;
    }, 0);
    const freeShip = totalPrice >= 100000000 ? 50000 : totalPrice >= 50000000 ? 30000 : 0;
    const totalFreeShip = totalVAT - freeShip > 0 ? totalVAT - freeShip : 0;
    return (
        <RootStyle>
            <Wrapper>
                <Heading>
                    <Typography variant='subtitle2'>Ship Address</Typography>
                    <Linking component={RouterLink} to={PATH_CHECKOUT.shipping}>Change</Linking>
                </Heading>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mt: 1 }}>
                    {user.name}
                </Typography>
                <Typography variant='subtitle2'>
                    {user.address}
                </Typography>
                <Typography variant='subtitle2'>
                    Phone: {user.phone}
                </Typography>
            </Wrapper>
            <Wrapper>
                <Heading>
                    <Typography variant='subtitle2'>Order</Typography>
                    <Linking component={RouterLink} to={PATH_PAGE.cart}>Change</Linking>
                </Heading>
                <Wrapper>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle2'>Guess</Typography>
                        <Typography variant='subtitle1'>{toVND(totalPrice)}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle2'>Coupon</Typography>
                        <Typography variant='subtitle1'>- {totalCoupon}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle2'>Ship Fee</Typography>
                        <Typography variant='subtitle1'>+ {toVND(totalVAT)}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle2'>Freeship</Typography>
                        <Typography variant='subtitle1'>- {toVND(freeShip)}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle2'>Total</Typography>
                        <Stack alignItems='end'>
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: 'error.main' }}>
                                {!isChecked && 'Choose a product, please!'}
                                {isChecked && toVND(totalPrice - totalCoupon + totalFreeShip)}
                            </Typography>
                            <Typography variant='caption'>
                                (VAT includes)
                            </Typography>
                        </Stack>
                    </Stack>
                </Wrapper>
            </Wrapper>
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    width: `calc(100% - 830px)`,
    marginTop: '30px',
    [theme.breakpoints.down('md')]: {
        width: '99.5%'
    }
}));

const Wrapper = styled('div')(({ theme }) => ({
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: theme.palette.background.paper,
    fontSize: '14px'
}));

const Heading = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgb(201, 201, 201)',
    paddingBottom: '10px'
});

const Linking = styled(Link)({
    textDecoration: 'none',
    color: 'rgb(26 139 237)',
    cursor: 'pointer',
    fontWeight: '500'
});

CheckoutInfor.propTypes = propTypes;

export default CheckoutInfor;
