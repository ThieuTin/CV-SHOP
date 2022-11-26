import { styled } from '@mui/material/styles';

import { MAIN_PADDING, HEADER_HEIGHT } from '../../constant';
import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';

const HEADER = {
    HEIGHT: HEADER_HEIGHT,
    PADDING: MAIN_PADDING
};

const MainHeader = () => (
    <>
        <HeaderContainer>
            <HeaderTop />
            <HeaderBottom />
        </HeaderContainer >
        <HeaderSpacing />
    </>
);

const HeaderContainer = styled('div')(({ theme }) => ({
    height: HEADER.HEIGHT,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: HEADER.PADDING,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    // boxShadow: `2px 2px 3px ${theme.palette.divider}`,
    zIndex: 999,
    [theme.breakpoints.down('sm')]: {
        padding: '5px'
    }
}));

const HeaderSpacing = styled('div')({
    height: HEADER_HEIGHT,
    marginBottom: '10px'
});

export default MainHeader;
