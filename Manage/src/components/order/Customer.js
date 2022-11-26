import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Chip, Button } from '@mui/material';

// apis
import orderApi from '../../apis/orderApi';
// hooks
import useSnackbar from '../../hooks/useSnackbar';
// utils
import { fDate } from '../../utils/formatDate';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const Customer = ({ customer }) => {
    const navigate = useNavigate();
    const { setSnackbar } = useSnackbar();
    const { _id, customerName, customerPhone, customerAddress, createdAt, status } = customer;
    const handleChangeStatus = async () => {
        const res = await orderApi.switchStatus(_id);
        const { statusText, message } = res;
        if (statusText === 'success') {
            navigate(PATH_DASHBOARD.order.list);
        };
        setSnackbar({
            isOpen: true,
            type: statusText,
            message: message
        });
    };
    return (
        <Stack spacing={2}>
            <div>
                <Typography varriant='subtitle2' sx={{ fontWeight: 'bold' }}>Customer name: </Typography>
                <Typography varriant='subtitle2'>{customerName}</Typography>
            </div>
            <div>
                <Typography varriant='subtitle2' sx={{ fontWeight: 'bold' }}>Customer phone: </Typography>
                <Typography varriant='subtitle2'>{customerPhone}</Typography>
            </div>
            <div>
                <Typography varriant='subtitle2' sx={{ fontWeight: 'bold' }}>Shipping address: </Typography>
                <Typography varriant='subtitle2'>{customerAddress}</Typography>
            </div>
            <div>
                <Typography varriant='subtitle2' sx={{ fontWeight: 'bold' }}>Ordered at: </Typography>
                <Typography varriant='subtitle2'>{fDate(createdAt)}</Typography>
            </div>
            <div>
                <Typography varriant='subtitle2' sx={{ fontWeight: 'bold' }}>Status: </Typography>
                <Chip
                    color={status === 'proccessing' ? 'error' : 'success'}
                    label={status}
                />
            </div>
            {status === 'proccessing' && (
                <Stack alignItems='end'>
                    <Button variant='contained' color='success' onClick={handleChangeStatus}>
                        Received success
                    </Button>
                </Stack>
            )}
        </Stack>
    );
};

export default Customer;
