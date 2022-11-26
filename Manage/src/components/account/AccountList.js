import { useNavigate } from 'react-router-dom';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Stack, Box, Typography, Alert } from '@mui/material';
import { AddCircle, Edit, Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useConfirm } from 'material-ui-confirm';
//apis
import accountApi from '../../apis/accountApi';
// path
import { PATH_DASHBOARD } from '../../routes/path'
// utils
import { fDate } from '../../utils/formatDate';
import { distinguishImage } from '../../utils/formatImage';

const columns = [
    {
        field: 'email',
        title: 'Email',
        width: '30%',
    },
    {

        field: 'name',
        title: 'Name',
        width: '25%',
        render: row => (
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
            >
                {row.image && (
                    <Box
                        component='img'
                        alt={row.name}
                        src={distinguishImage(row.image)}
                        sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%'
                        }}
                    />
                )}
                <Typography variant='subtitle2'>{row.name}</Typography>
            </Stack>
        )
    },
    {
        field: 'phone',
        title: 'Phone',
        width: '14%',
    },
    {
        field: 'address',
        title: 'Address',
        width: '14%',
    },
    {
        field: 'role',
        title: 'Role',
        width: '14%',
    },
    {
        field: 'createdAt',
        title: 'Created At',
        width: '14%',
        render: row => (
            <Typography variant='body2'>{fDate(row.createdAt)}</Typography>
        )
    }
];

const options = {
    selection: true,
    addRowPosition: 'first',
    actionsColumnIndex: -1,
    tableLayout: 'fixed',
    exportMenu: [{
        label: 'Export PDF',
        exportFunc: (cols, datas) => ExportPdf(cols, datas, 'AccountPdf')
    }, {
        label: 'Export CSV',
        exportFunc: (cols, datas) => ExportCsv(cols, datas, 'AccountCsv')
    }]
};

const AccountList = () => {
    const navigate = useNavigate();
    const confirm = useConfirm();
    const [accounts, setAccounts] = useState(null);
    useEffect(() => {
        const getAccounts = async () => {
            const accounts = await accountApi.findAll();
            setAccounts(accounts);
        }
        getAccounts();
    }, []);
    const handleDelete = async _accountID => {
        try {
            await confirm({
                title: 'Are you sure to Delete this Account?',
                content: <Alert severity='error'>This account will move to recycle bin</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            const res = await accountApi.deletebyID(_accountID);
            const { statusText, message, accountID } = res;
            const newAccount = accounts.filter(_account => _account._id !== accountID);
            setAccounts(newAccount);
        } catch (error) {

        }
    }
    const handleDeleteSelected = async _data => {
        try {
            await confirm({
                title: 'Are you sure to Delete selected Account?',
                content: <Alert severity='error'>Selected account will move to recycle bin</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            const deleteIds = _data.map(item => item._id);
            const res = await accountApi.deletedAll(deleteIds);
            const { statusText, message, accountIDs } = res;
            const newAccount = accounts.filter(_account => !accountIDs.includes(_account._id));
            setAccounts(newAccount);
        } catch (error) {

        }
    }
    return (
        <>
            {accounts && (
                <MaterialTable
                    title='Account'
                    columns={columns}
                    data={accounts}
                    options={options}

                    actions={[
                        {
                            icon: () => <Edit color='warning' />,
                            tooltip: 'Xem và sửa',
                            onClick: (event, row) => navigate(`/account/edit/${row._id}`),
                            position: 'row'
                        },
                        {
                            icon: () => <Delete color='error' />,
                            tooltip: 'Delete',
                            onClick: (event, row) => handleDelete(row._id),
                            position: 'row'
                        },
                        {
                            icon: () => <AddCircle color='success' />,
                            tooltip: 'Thêm',
                            isFreeAction: true,
                            onClick: () => navigate(PATH_DASHBOARD.account.create)
                        },
                        {
                            icon: () => <Delete color='error' />,
                            tooltip: 'Remove All Selected Users',
                            onClick: (evt, data) => handleDeleteSelected(data)
                        }
                    ]}
                />
            )}
            {!accounts && "Loading..."}
        </>
    );
};

export default AccountList;
