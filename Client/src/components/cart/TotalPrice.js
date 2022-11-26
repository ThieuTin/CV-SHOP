import PropTypes from 'prop-types';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Link } from '@mui/material';

import { PATH_CHECKOUT } from '../../routes/path';
import { CART_WIDTH } from '../../constant';
import { HEADER_HEIGHT } from '../../constant';
import { toVND } from '../../utils/formatMoney';
import useSnackbar from '../../hooks/useSnackbar';

const propTypes = {
    user: PropTypes.object,
    cart: PropTypes.array
};

const TotalPrice = ({ user, cart }) => {
    const { setSnackbar } = useSnackbar();
    const history = useHistory();
    const { name, phone, address } = user;
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
    const handleNavigateCheckout = () => {
        if (!isChecked) {
            setSnackbar({
                isOpen: true,
                type: null,
                message: 'You haven\'t selected any products to buy yet'
            });
            return;
        }
        const isFilledInfor = phone !== '' || address !== '';
        history.push(isFilledInfor ? PATH_CHECKOUT.payment : `${PATH_CHECKOUT.shipping}?isIntendingCart=1`);
    };
    return (
        <RootStyle>
            <ContentInner>
                <Wrapper>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: '5px' }}>
                        <Typography variant='subtitle2'>Ship Address</Typography>
                        <Linking component={RouterLink} to={`${PATH_CHECKOUT.shipping}?isIntendingCart=1`}>
                            Change
                        </Linking>
                    </Stack>
                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                        {name} | {phone ? phone : <Linking component={RouterLink} to={`${PATH_CHECKOUT.shipping}?isIntendingCart=1`}>
                            Add phone
                        </Linking>}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {address ? address : <Linking component={RouterLink} to={`${PATH_CHECKOUT.shipping}?isIntendingCart=1`}>
                            Add address
                        </Linking>}
                    </Typography>
                </Wrapper>
                <Wrapper>
                    <Typography variant='subtitle2' sx={{ mb: '5px' }}>Coupon tickets</Typography>
                    <Link><i className="fas fa-ticket-alt"></i> Select or enter coupon code</Link>
                </Wrapper>
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
                <OrderButton onClick={handleNavigateCheckout}>
                    Check out ({cart.filter(item => item.checked).length})
                </OrderButton>
            </ContentInner>
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    width: `calc(100% - calc(${CART_WIDTH} + 15px))`,
    margin: '10px 0',
    [theme.breakpoints.down('md')]: {
        width: '99.5%'
    }
}));

const ContentInner = styled('div')({
    position: 'sticky',
    top: `calc(${HEADER_HEIGHT} + 10px)`,
});

const Wrapper = styled('div')(({ theme }) => ({
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: theme.palette.background.paper,
    fontSize: '14px',
}));

const Linking = styled(Link)({
    color: 'rgb(26 139 237)',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: '500'
});

const OrderButton = styled('button')({
    width: '100%',
    backgroundColor: '#f76254',
    borderRadius: '5px',
    color: '#fff',
    height: '40px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f53d2d'
    }
});

TotalPrice.propTypes = propTypes;

export default TotalPrice;
