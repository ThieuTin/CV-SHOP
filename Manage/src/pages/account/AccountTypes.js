import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TypeList } from '../../components/account';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const AccountTypes = () => {
    return (
        <Page title='Account types'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Account types'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <TypeList />
            </Container>
        </Page>
    );
};

export default AccountTypes;
