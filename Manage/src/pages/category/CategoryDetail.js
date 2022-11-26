import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CategoryForm } from '../../components/category';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const CategoryDetail = () => {
    return (
        <Page title='Medium Corporation'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Medium Corporation'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Categories', href: PATH_DASHBOARD.category.root },
                    ]}
                />
                <CategoryForm />
            </Container>
        </Page>
    );
};

export default CategoryDetail;
