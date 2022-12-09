import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Button } from '@mui/material';
import { ThumbUpOutlined, ChatOutlined } from '@mui/icons-material';

import Title from '../Title';
import Stars from '../Stars';
import AvatarBadge from '../AvatarBadge';
import ResponseChild from './ResponseChild';

const propTypes = {
    status: PropTypes.string
};

const Comment = ({ status }) => (
    <RootStyle direction='row'>
        <Stack
            sx={{ width: '335px', display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}
            alignItems='center'
        >
            <AvatarBadge status={status} width={60} height={60} />
            <Title sx={{ pb: 0 }}>Tin</Title>
            <Typography variant='body2'>Joined 2 day ago</Typography>
        </Stack>
        <Stack
            sx={{ width: { xs: '100%', lg: 'calc(100% - 335px)' } }}
        >
            <Stack
                direction='row'
                alignItems='center'
                sx={{ display: { xs: 'flex', md: 'none', lg: 'none' }, mb: '10px' }}
            >
                <AvatarBadge status={status} width={30} height={30} />
                <Stack sx={{ mx: 2 }}>
                    <Title sx={{ p: 0 }}>Lê Chính Tuệ</Title>
                    <Typography variant='body2'>Joined 4 years ago</Typography>
                </Stack>
            </Stack>
            <Stack direction='row'>
                <Stars total={5} rating={5} />
                <Title sx={{ p: 0, px: 1, fontSize: '15px' }}>Very good</Title>
            </Stack>
            <Typography variant='subtitle1'>
                
            </Typography>
            <Typography variant='body2' sx={{ px: 1 }}>Review at 14/11/2020</Typography>
            <Stack direction='row'>
                <StyledButton variant='outlined' startIcon={<ThumbUpOutlined />}>
                    Helpful (69)
                </StyledButton>
                <StyledButton variant='outlined' startIcon={<ChatOutlined />}>
                    Reply
                </StyledButton>
            </Stack>
            <Stack>
                <ResponseChild status="online" />
                <ResponseChild status="offline" />
            </Stack>
        </Stack>
    </RootStyle>
);

const RootStyle = styled(Stack)(({ theme }) => ({
    padding: '20px 0',
    borderBottom: `2px solid ${theme.palette.background.default}`,
    borderTop: `2px solid ${theme.palette.background.default}`
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    margin: '5px',
    transition: '0.3s',
    '&:first-of-type:hover': {
        backgroundColor: '#2196f3',
        color: '#fff'
    }
}));

Comment.propTypes = propTypes;

export default Comment;
