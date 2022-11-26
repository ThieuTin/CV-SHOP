import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
//apis
import accountApi from '../../apis/accountApi';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { AccountForm } from '../../components/account';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const AccountCreate = () => {
    const [account, setAccount] = useState(null);
    const { pathname } = useLocation();
    const isEdit = pathname.includes('edit');
    useEffect(() => {
        const getAccount = async () => {
            const account = await accountApi.findById(pathname.split('/').pop());
            setAccount(account);
        };
        isEdit && getAccount();
    }, [isEdit, pathname]);

    return (
        <Page title={`${account?.name || 'Create Account'}`}>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header={!isEdit? 'Create Account' : account? account.name: ''}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Accounts', href: PATH_DASHBOARD.account.list },
                    ]}
                />
                <AccountForm isEdit={isEdit} account={account} />
            </Container>
        </Page>
    );
};

export default AccountCreate;
