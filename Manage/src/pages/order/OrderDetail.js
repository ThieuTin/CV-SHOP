import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Card } from '@mui/material';

// apis
import orderApi from '../../apis/orderApi';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { Customer, Ordered } from '../../components/order';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const OrderDetail = () => {
    const { pathname } = useLocation();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const getOrder = async () => {
            const res = await orderApi.findById(pathname.split('/').pop());
            const { ordered, ...customer } = res;
            setOrder({
                customer,
                ordered
            });
        };
        getOrder();
    }, [pathname]);
    return (
        <Page title='Order Detail'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Order Detail'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Orders', href: PATH_DASHBOARD.order.root }
                    ]}
                />
                {order && (
                    <Grid container spacing={3} mt={1}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3 }}>
                                <Customer customer={order.customer} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3 }}>
                                <Ordered ordered={order.ordered} />
                            </Card>
                        </Grid>
                    </Grid>
                )}
                {!order && 'Loading...'}
            </Container>
        </Page>
    );
};

export default OrderDetail;
