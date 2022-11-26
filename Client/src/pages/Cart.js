import { Link } from 'react-router-dom';
import { Container, Stack, Breadcrumbs, Typography, Button, Alert, AlertTitle } from '@mui/material';
import { useSelector } from 'react-redux';

import Page from '../components/Page';
import Image from '../components/Image';
import { PATH_PAGE } from '../routes/path';
import { CartList, TotalPrice } from '../components/cart';

const Cart = () => {
    const { user } = useSelector(state => state.user);
    const { totalItem, cart } = useSelector(state => state.cart);
    return (
        <Page title='Cart | CV Shop'>
            <Container className="wide-container">
                <Breadcrumbs separator='›' sx={{ pb: '5px' }}>
                    <Link to={PATH_PAGE.home} style={{ fontSize: '15px' }}>
                        Home
                    </Link>
                    <Typography fontSize='15px' color='text.primary'>
                        Cart
                    </Typography>
                </Breadcrumbs>

                {/* Events start */}
                <Alert severity="info">
                    <AlertTitle>Promotional events</AlertTitle>
                    Free shipping for orders from 50M <strong>(11/1/2021 - 12/31/2021)</strong>
                </Alert>
                {/* Events end */}

                <Typography variant='h5' sx={{ mb: 2 }}>
                    Cart
                </Typography>
                {totalItem !== 0 && (
                    <Stack
                        direction={{ xs: 'column', sm: 'column', lg: 'row' }}
                        justifyContent='space-between'
                    >
                        <CartList totalItem={totalItem} cart={cart} />
                        <TotalPrice user={user} cart={cart} />
                    </Stack>
                )}
                {totalItem === 0 && (
                    <Stack
                        alignItems='center'
                        spacing={1}
                        sx={{ p: 5, backgroundColor: theme => theme.palette.background.paper }}
                    >
                        <Image
                            src='https://salt.tikicdn.com/desktop/img/mascot@2x.png'
                            alt=''
                            sx={{ width: '190px', height: '160px' }}
                        />
                        <Typography variant='title'>
                            There are no products in your cart.
                        </Typography>
                        <Link to={PATH_PAGE.home}>
                            <Button color='warning' variant='contained'>
                                BUY NOW
                            </Button>
                        </Link>
                    </Stack>
                )}
            </Container>
        </Page>
    );
}

export default Cart;
