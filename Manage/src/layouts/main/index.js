import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

//
import MainAppbar from './MainAppbar';
import MainSidebar from './MainSidebar';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainLayout = () => {
    const [open, setOpen] = useState(false);
    return (
        <RootStyle>
            <MainAppbar onOpenSidebar={() => setOpen(true)} />
            <MainSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
            <ContentStyle>
                <Outlet />
            </ContentStyle>
        </RootStyle>
    );
};

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const ContentStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100vh',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

export default MainLayout;
