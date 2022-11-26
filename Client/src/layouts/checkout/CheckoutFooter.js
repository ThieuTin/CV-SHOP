import { Container, Stack, Typography } from '@mui/material';

const CheckoutFooter = () => {
    return (
        <Container sx={{ py: 5 }}>
            <Stack>
                <Typography variant='caption'>By placing a Purchase Order, the customer agrees to the General Trading Conditions issued by CV Shop</Typography>
                <Typography variant='caption'>Operational Regulations | Complaint settlement policy | Warranty policy | Payment privacy policy | Personal information privacy policy</Typography>
                <Typography variant='caption' sx={{ my: 2 }}>© 2019 - Copyright CV Shop Company - CVShop.vn</Typography>
            </Stack>
        </Container>
    )
}

export default CheckoutFooter;
