import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { AccountForm } from '../../components/account';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const AccountDetail = () => {
    return (
        <Page title='Account Detail'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Account Detail'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Accounts', href: PATH_DASHBOARD.account.root },
                    ]}
                />
                <AccountForm />
            </Container>
        </Page>
    )
};

export default AccountDetail;