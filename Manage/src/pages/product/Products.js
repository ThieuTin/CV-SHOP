import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProductList } from '../../components/product';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const Products = () => {
    return (
        <Page title='Products'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Products'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <ProductList />
            </Container>
        </Page>
    );
};

export default Products;
