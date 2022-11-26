import { forwardRef } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Alert
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import useModal from '../hooks/useModal';
import { removeCart } from '../redux/slices/cart';

const Transition = forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const Modal = () => {
    const { _id, isOpen, title, content, type, caseSubmit } = useSelector(state => state.dialog);
    const { setModal } = useModal();
    const dispatch = useDispatch();
    const handleClose = () => {
        setModal();
    };
    const [action, which] = caseSubmit ? caseSubmit.split('/') : [null, null];
    const handleSubmit = () => {
        if (action && which) {
            switch (action) {
                case 'remove':
                    which === 'cart' && dispatch(removeCart(_id))
                    break;
                default:
                    break;
            }
            handleClose();
        }
    };
    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            {action && which && (
                <>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <Alert severity={type}>{content}</Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            color={
                                action === 'save' ? 'success' :
                                action === 'edit' ? 'warning' :
                                action === 'remove' ? 'error' :
                                ''
                            }
                            onClick={handleSubmit}
                        >
                            {action}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default Modal;
