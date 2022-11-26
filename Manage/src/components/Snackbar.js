import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { useSelector } from 'react-redux';

import useSnackbar from '../hooks/useSnackbar';

const Snackbar = () => {
    const { isOpen, type, message } = useSelector(state => state.snackbar);
    const { setSnackbar } = useSnackbar();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar();
    };
    if (!type) {
        return (
            <MuiSnackbar
                open={isOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            />
        );
    }
    return (
        <MuiSnackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
        >
            <Alert severity={type} variant='filled' sx={{ width: '100%' }}>
                {message}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;
