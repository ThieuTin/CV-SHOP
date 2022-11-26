import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CategoryList } from '../../components/category';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const Categories = () => {
    return (
        <Page title='Categories'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Categories'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <CategoryList />
            </Container>
        </Page>
    );
};

export default Categories;
