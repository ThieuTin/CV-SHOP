import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// components
import Image from '../Image';
// utils
import { toVND } from '../../utils/formatMoney';

const propTypes = {
    cart: PropTypes.array
};

const Delivery = ({ cart }) => {
    return (
        <Stack sx={{ mb: 3 }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>1. Delivery form</Typography>
            <Wrapper>
                {cart && cart.map(item => {
                    const { _id, images, name, amount, VATFee, price } = item;
                    return (
                        <Item key={_id}>
                            <VAT>{VATFee > 0 ? toVND(VATFee) : 'Freeship'}</VAT>
                            <Image
                                src={images[0]}
                                alt={name}
                                sx={{ width: '86px', height: '86px' }}
                            />
                            <Stack sx={{ width: 'calc(100% - 95px)' }}>
                                <Name>
                                    <Typography variant='body2'>
                                        {name}
                                    </Typography>
                                </Name>
                                <Typography variant='subtitle2'>{toVND(price)} | x{amount}</Typography>
                            </Stack>
                        </Item>
                    )
                })}
            </Wrapper>
        </Stack>
    );
};

const Wrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    padding: '15px'
}));

const Item = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: '5px',
    padding: '15px',
    margin: '0 0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

const Name = styled('div')({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden'
});

const VAT = styled('span')({
    position: 'absolute',
    top: '5px',
    right: '15px',
    display: 'block',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#F53D2D'
});

Delivery.propTypes = propTypes;

export default Delivery;
