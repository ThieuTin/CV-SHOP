import { Container, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

// components
import Page from '../../components/Page';
import { CheckoutSection, CheckoutInfor } from '../../components/checkout';

const Payment = () => {
    const { user } = useSelector(state => state.user);
    const { cart } = useSelector(state => state.cart);
    return (
        <Page title='Billing information | CV Shop'>
            <Container sx={{ pt: 3 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'column', lg: 'row' }}
                    justifyContent='space-between'
                >
                    <CheckoutSection user={user} cart={cart} />
                    <CheckoutInfor user={user} cart={cart} />
                </Stack>
            </Container>
        </Page>
    );
};

export default Payment;
