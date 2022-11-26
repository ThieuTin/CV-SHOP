import { styled } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Container, Stack, Typography, Link } from '@mui/material';
import { useSelector } from 'react-redux';

// components
import Page from '../../components/Page';
import { ShippingForm } from '../../components/checkout';
// path
import { PATH_CHECKOUT, PATH_PAGE } from '../../routes/path';

const Shipping = () => {
    const queries = new URLSearchParams(useLocation().search);
    const isIntendingCart = queries.get('isIntendingCart');
    const { user } = useSelector(state => state.user);
    const isFilledInfor = user.phone !== '' || user.address !== '';
    return (
        <Page title='Shipment details | CV Shop'>
            <Container sx={{ pt: 3 }}>
                <Stack spacing={1}>
                    <Typography variant='h6'>Shipping address</Typography>
                    <Typography variant='subtitle1'>Choose from the available shipping addresses below:</Typography>
                    {!isFilledInfor && <ShippingForm />}
                    {isFilledInfor && (
                        <ShipItem>
                            <Tag>Default</Tag>
                            <Edit>
                                <i className="bi bi-pencil-square"></i>
                            </Edit>
                            <Typography variant='subtitle2' component='p'>{user.name}</Typography>
                            <Typography variant='body2' component='p'>Address: {user.address}</Typography>
                            <Typography variant='body2' component='p'>Phone: {user.phone}</Typography>
                            <Select component={RouterLink} to={isIntendingCart ? PATH_PAGE.cart : PATH_CHECKOUT.payment} sx={{ my: 2 }}>
                                Delivered to this location
                            </Select>
                        </ShipItem>
                    )}
                </Stack>
            </Container>
        </Page>
    );
};

const ShipItem = styled('div')(({ theme }) => ({
    position: 'relative',
    maxWidth: 'calc(50% - 20px)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderRadius: '3px',
    border: '1px dashed rgb(0, 153, 0)',
    padding: '10px 15px',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
    }
}));

const Tag = styled('span')({
    position: 'absolute',
    top: '10px',
    right: '15px',
    display: 'block',
    fontSize: '11px',
    color: 'rgb(0, 153, 0)'
});

const Edit = styled('div')({
    position: 'absolute',
    bottom: '10px',
    right: '15px',
    display: 'block',
    cursor: 'pointer',
    '&:hover': {
        color: 'rgb(0, 153, 0)'
    }
});

const Select = styled(Link)({
    textDecoration: 'none',
    color: 'rgb(0, 153, 0)',
    fontSize: '13px',
    fontWeight: 'bold'
});

export default Shipping;
