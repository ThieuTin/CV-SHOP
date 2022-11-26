import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Chip } from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';

// apis
import orderApi from '../../apis/orderApi';
// path
import { PATH_DASHBOARD } from '../../routes/path'

const columns = [
    {
        field: 'customerName',
        title: 'Customer Name',
        width: '25%',
    },
    {
        field: 'customerPhone',
        title: 'Customer Phone',
        width: '15%',
    },
    {
        field: 'createdAt',
        title: 'Created At',
        width: '30%',
    },
    {
        field: 'status',
        title: 'Status',
        width: '15%',
        render: row => (
            <Chip
                color={row.status === 'proccessing' ? 'error' : 'success'}
                label={row.status}
            />
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
        exportFunc: (cols, datas) => ExportPdf(cols, datas, 'OrderPdf')
    }, {
        label: 'Export CSV',
        exportFunc: (cols, datas) => ExportCsv(cols, datas, 'OrderCsv')
    }]
};

const OrderList = () => {
    const [orders, setOrders] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getOrders = async () => {
            const orders = await orderApi.findAll();
            setOrders(orders);
        };
        getOrders();
    }, []);
    return (
        <>
            {orders && (
                <MaterialTable
                    title='Bill'
                    columns={columns}
                    data={orders}
                    options={options}
                    actions={[
                        {
                            icon: () => <RemoveRedEye />,
                            tooltip: 'View',
                            onClick: (event, row) => navigate(`${PATH_DASHBOARD.order.root}/${row._id}`),
                            position: 'row'
                        },
                    ]}
                />
            )}
            {!orders && 'Loading...'}
        </>
    );
};

export default OrderList;
