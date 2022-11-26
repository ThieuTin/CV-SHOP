// import { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';

// import MainPopover from '../../components/MainPopover';

const NotifycationPopover = () => {
    // const anchorNotify = useRef(null);
    // const [openedPopover, setOpenedPopover] = useState(false);
    // const popoverEnter = () => {
    //     setOpenedPopover(true);
    // };
    // const popoverLeave = () => {
    //     setOpenedPopover(false);
    // };
    return (
        <Label>
            <i className="fas fa-bell"></i> Notification
        </Label>
        // <>
        //     <Label
        //         ref={anchorNotify}
        //         onMouseEnter={popoverEnter}
        //         onMouseLeave={popoverLeave}
        //     >
        //         <i className="fas fa-bell"></i> Notification
        //     </Label>
        //     <MainPopover
        //         open={openedPopover}
        //         anchorEl={anchorNotify.current}
        //         anchorVer="bottom"
        //         anchorHor="right"
        //         transformVer="top"
        //         transformHor="right"
        //         onMouseEnter={popoverEnter}
        //         onMouseLeave={popoverLeave}
        //     >
        //         <h3>Hehe</h3>
        //     </MainPopover>
        // </>
    );
};

const Label = styled('span')({
    padding: '0px 10px',
    fontWeight: '500',
    transition: '0.3s',
    fontSize: '14px',
    cursor: 'pointer',
    borderBottom: '1px solid transparent',
    '&:hover': {
        color: '#f53d2d',
        borderBottom: '1px solid #f53d2d'
    }
});

export default NotifycationPopover;
