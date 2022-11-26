import { useDispatch } from 'react-redux';

import { initDialog } from '../redux/slices/dialog';

const useModal = () => {
    const dispatch = useDispatch();
    const setModal = (settings = {
        isOpen: false,
        _id: null,
        title: '',
        content: '',
        type: 'info',
        caseSubmit: null
    }) => {
        dispatch(initDialog(settings));
    };
    return { setModal };
};

export default useModal;
