import { styled } from '@mui/material/styles';
import { LocalShipping } from '@mui/icons-material';

const Loading = () => (
    <RootStyle>
        <Box>
            <Box sx={{ width: '100px', height: '100px' }}>
                <LocalShipping
                    sx={{ color: '#ff6767', transform: 'rotate(-90deg)', fontSize: '55px' }}
                />
                <Line type='child' />
                <Line type='child' />
                <Line type='child' />
                <Line type='child' />
            </Box>
            <Line type='parent' />
            <Line type='parent' />
            <Line type='parent' />
            <Line type='parent' />
        </Box>
        <Message>Wait a minute, we'll be right back</Message>
    </RootStyle>
);

const RootStyle = styled('div')({
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
});

const Box = styled('div')({
    position: 'relative',
    width: '150px',
    height: '150px',
    transform: 'rotate(45deg)',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

const Line = styled('span')(({ type }) => ({
    position: 'absolute',
    '&:nth-of-type(1)': {
        background: 'linear-gradient(90deg,transparent,#f84949)',
        width: '100%',
        height: '3px',
        top: 0,
        animation: `${type === 'parent' ? 'move-right 1s' : 'move-left 1.5s'} infinite ease-in-out`
    },
    '&:nth-of-type(2)': {
        background: 'linear-gradient(180deg,transparent,#f84949)',
        width: '3px',
        height: '100%',
        top: 0,
        right: 0,
        animation: `${type === 'parent' ? 'move-bottom 1s' : 'move-top 1.5s'} infinite ease-in-out`
    },
    '&:nth-of-type(3)': {
        background: 'linear-gradient(-90deg,transparent,#f84949)',
        width: '100%',
        height: '3px',
        bottom: 0,
        animation: `${type === 'parent' ? 'move-left 1s' : 'move-right 1.5s'} infinite ease-in-out`
    },
    '&:nth-of-type(4)': {
        background: 'linear-gradient(0deg,transparent,#f84949)',
        width: '3px',
        height: '100%',
        bottom: 0,
        left: 0,
        animation: `${type === 'parent' ? 'move-top 1s' : 'move-bottom 1.5s'} infinite ease-in-out`
    },
    '@keyframes move-right': {
        '0%': { left: '-100%' },
        '100%': { left: '100%' }
    },
    '@keyframes move-bottom': {
        '0%': { top: '-100%' },
        '100%': { top: '100%' }
    },
    '@keyframes move-left': {
        '0%': { right: '-100%' },
        '100%': { right: '100%' }
    },
    '@keyframes move-top': {
        '0%': { top: '100%' },
        '100%': { top: '-100%' }
    }
}));

const Message = styled('span')({
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '50px'
});

export default Loading;
