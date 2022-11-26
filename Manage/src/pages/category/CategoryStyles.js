import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { StyleList } from '../../components/category';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const CategoryStyles = () => {
    return (
        <Page title='Category styles'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Category styles'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <StyleList />
            </Container>
        </Page>
    );
};

export default CategoryStyles;
