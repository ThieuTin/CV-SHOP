import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { AccountList } from '../../components/account';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const Accounts = () => {
    return (
        <Page title='Accounts'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Accounts'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <AccountList />
            </Container>
        </Page>
    );
};

export default Accounts;
