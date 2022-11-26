import { Container, Grid, Typography } from '@mui/material';

// components
import Page from '../components/Page';
import {
    TotalActiveCategories,
    TotalActiveAccounts,
    TotalActiveTeams
} from '../components/dashboard';
// import Charts from '../components/dashboard/Charts'
const Team = () => {
    return (
        <Page title='Dashboard'>
            <Container sx={{ pb: 3 }}>
                <Typography gutterBottom variant='h5' sx={{ mb: 2 }}>
                    Welcome back, Pihe!
                </Typography>
                <Grid container spacing={3} mb={5} >
                    <Grid item xs={12} md={4}>
                        <TotalActiveCategories />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TotalActiveAccounts />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TotalActiveTeams />
                    </Grid>
                </Grid>
                {/* <Charts /> */}
            </Container>
        </Page>
    );
};

export default Team;
