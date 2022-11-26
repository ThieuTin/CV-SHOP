import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { OrderList } from '../../components/order';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const Orders = () => {
    return (
        <Page title='Bills'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Bills'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <OrderList />
            </Container>
        </Page>
    );
};

export default Orders;
