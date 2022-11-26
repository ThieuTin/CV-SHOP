import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import { styled } from '@mui/material/styles';
import { Box, Stack, Button } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

const propTypes = {
    children: PropTypes.node
};

const AuthLayout = ({ children }) => (
    <Stack
        direction={{ xs: 'column', lg: 'row' }}
        justifyContent='space-around'
        alignItems='center'
        sx={{ p: 6, backgroundColor: theme => theme.palette.background.paper }}
    >
        <ImageWrapper>
            <Image src="https://www.pngplay.com/wp-content/uploads/6/E-Commerce-Shopping-PNG-Clipart-Background.png" alt="" />
            <MoveImage>
                <Image src="https://images.pngnice.com/download/2007/Shopping-PNG-Photos.png" alt="" />
            </MoveImage>
            <MoveImage>
                <Image src="https://images.pngnice.com/download/2007/Shopping-PNG-Photos.png" alt="" />
            </MoveImage>
            <MoveImage>
                <Image src="https://www.graphicsprings.com/filestorage/stencils/bdc5649fb67a5ab2fc8b4a0dc0eac951.png?width=500&height=500" alt="" />
            </MoveImage>
            <Link to='form-wrapper' duration={500}>
                <Start size='large' variant='contained' color='error' endIcon={<ArrowDownward />}>Let's start</Start>
            </Link>
        </ImageWrapper>
        <Box sx={{ width: { xs: '100%', lg: '500px' } }} id='form-wrapper'>
            {children}
        </Box>
    </Stack>
);

const ImageWrapper = styled('div')(({ theme }) => ({
    width: '400px',
    height: '500px',
    position: 'relative',
    '& div:nth-of-type(1)': {
        top: 0,
        left: '80%',
        animation: 'move-horizontal 1.5s infinite ease-in-out'
    },
    '& div:nth-of-type(2)': {
        top: '50%',
        left: '95%',
        animation: 'move-vertical 2s infinite ease-in-out'
    },
    '& div:nth-of-type(3)': {
        top: 'calc(100% - 80px)',
        left: 'calc(50% - 55px)',
        animation: 'shake 2s infinite ease-in-out'
    },
    [theme.breakpoints.down('lg')]: {
        marginBottom: '120px',
        '& div:nth-of-type(1)': {
            top: '15%',
            left: '-6%'
        },
        '& div:nth-of-type(2)': {
            top: '-9%',
            left: '64%'
        },
    }
}));

const MoveImage = styled('div')({
    width: '150px',
    height: '110px',
    position: 'absolute',
    '@keyframes move-horizontal': {
        '0%': {
            marginTop: 0
        },
        '50%': {
            marginTop: '-15px'
        },
        '100%': {
            marginTop: 0
        }
    },
    '@keyframes move-vertical': {
        '0%': {
            marginLeft: 0
        },
        '50%': {
            marginLeft: '-15px'
        },
        '100%': {
            marginLeft: 0
        }
    },
    '@keyframes shake': {
        '0%': {
            transform: 'rotate(-7deg)'
        },
        '50%': {
            transform: 'rotate(7deg)'
        },
        '100%': {
            transform: 'rotate(-7deg)'
        }
    }
});

const Image = styled('img')({
    width: '100%',
    height: '100%',
    backgroundSize: '100% auto'
});

const Start = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: '105%',
    left: '50%',
    backgroundColor: '#f76254',
    borderRadius: '20px',
    [theme.breakpoints.up('lg')]: {
        display: 'none'
    }
}));

AuthLayout.propTypes = propTypes;

export default AuthLayout;
