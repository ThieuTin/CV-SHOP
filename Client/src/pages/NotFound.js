import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import { HomeWork } from '@mui/icons-material';

import Image from '../components/Image';

const NotFound = () => {
    const history = useHistory();
    const handleClick = () => history.replace('/');
    return (
        <RootStyle>
            <Typography variant='h4' sx={{ mb: 3 }}>
                Sorry, page not found!
            </Typography>
            <Typography variant='h6' sx={{ width: '50%', textAlign: 'center' }}>
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>
            <Image
                src='	https://minimal-kit-react.vercel.app/static/illustrations/illustration_404.svg'
                alt=''
                sx={{ width: '300px', height: '300px', my: 4 }}
            />
            <StyledButton variant="contained" endIcon={<HomeWork />} onClick={handleClick}>
                GO TO HOME
            </StyledButton>
        </RootStyle>
    );
}

const RootStyle = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const StyledButton = styled(Button)({
    backgroundColor: '#f57267',
    '&:hover': {
        backgroundColor: '#f95b4c'
    }
});

export default NotFound;
