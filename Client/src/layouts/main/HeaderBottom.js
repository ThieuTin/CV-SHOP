import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import SwitchTheme from './SwitchTheme';
import CartPopover from './CartPopover';
import FavoritePopover from './FavoritePopover';

const HeaderBottom = () => (
    <>
        <BoxContainer sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}>
            <Logo>CV SHOP</Logo>
            <SearchBar />
            <BoxContainer>
                <CartPopover />
                <FavoritePopover />
                <SwitchTheme />
            </BoxContainer>
        </BoxContainer>
        <Grid
            container
            alignItems="center"
            sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' } }}
        >
            <Grid item xs={6}>
                <Logo sx={{ width: '65px', height: '65px' }}>CV SHOP</Logo>
            </Grid>
            <Grid item xs={6}>
                <BoxContainer>
                    <CartPopover />
                    <FavoritePopover />
                    <SwitchTheme />
                </BoxContainer>
            </Grid>
            <Grid item xs={12}>
                <SearchBar sx={{ width: '85%', marginX: 'auto' }} />
            </Grid>
        </Grid>
    </>
);

const BoxContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
});

export default HeaderBottom;
