import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProductForm } from '../../components/product';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const ProductDetail = () => {
    return (
        <Page title='Product Detail'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Product Detail'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Products', href: PATH_DASHBOARD.product.root },
                    ]}
                />
                <ProductForm />
            </Container>
        </Page>
    )
};

export default ProductDetail;