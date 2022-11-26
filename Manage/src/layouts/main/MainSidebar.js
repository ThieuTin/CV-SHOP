import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Drawer, Typography } from '@mui/material';

// components
import Hidden from '../../components/Hidden';
import SidebarSection from '../../components/SidebarSection';
// 
import SIDEBAR_CONFIG from './SidebarConfig';

const DRAWER_WIDTH = 280;

const propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

const MainSidebar = ({ isOpenSidebar, onCloseSidebar }) => {
    const drawerStyle = {
        width: DRAWER_WIDTH,
        bgcolor: 'background.default',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    };
    const renderContent = (
        <>
            <Box sx={{ px: 2.5, py: 5, textAlign: 'center' }}>
                <Box
                    component='img'
                    alt='logo'
                    src='/dotlogo.png'
                    sx={{
                        width: '150px'
                    }}
                />
            </Box>

            <SidebarSection navConfig={SIDEBAR_CONFIG} />

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
                <Typography gutterBottom variant='subtitle1' sx={{ color: 'grey.800' }}>
                    Xin chào, Pihe
                </Typography>
                <Typography variant='body2' sx={{ mb: 2, color: 'grey.600' }}>
                    Cần trợ giúp?
                    <br /> Kiểm tra hướng dẫn của chúng tôi
                </Typography>
                <Button fullWidth to='/' variant='contained' component={RouterLink}>
                    Hướng dẫn
                </Button>
            </Box>
        </>
    );
    return (
        <RootStyle>
            <Hidden width='lgUp'>
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { ...drawerStyle }
                    }}
                >
                    {renderContent}
                </Drawer>
            </Hidden>
            <Hidden width='lgDown'>
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: { ...drawerStyle }
                    }}
                >
                    {renderContent}
                </Drawer>
            </Hidden>
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

MainSidebar.propTypes = propTypes;

export default MainSidebar;
