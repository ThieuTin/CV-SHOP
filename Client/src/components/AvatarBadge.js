import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Avatar, Badge } from '@mui/material';

const propTypes = {
    status: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    sx: PropTypes.object
};

const AvatarBadge = ({ status, width, height, sx }) => (
    <StatusBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        status={status}
        sx={{ width, height, ...sx }}
    >
        <Avatar
            src="http://dotshop69.000webhostapp.com/Public/images/tue.png"
            alt="Le Chinh Tue"
            sx={{ width: '100%', height: '100%' }}
        />
    </StatusBadge>
);

const StatusBadge = styled(Badge)(({ theme, status }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: `${status === 'online' ? '#44b700' : '#ccc'}`,
        color: `${status === 'online' ? '#44b700' : '#ccc'}`,
        boxShadow: `0 0 0 2px ${status === 'online' ? theme.palette.background.paper : '#ccc'}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: `${status === 'online' ? 'ripple 1.2s infinite ease-in-out' : ''}`,
            border: '1px solid currentColor',
            content: '""',
        }
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    }
}));

AvatarBadge.propTypes = propTypes;

export default AvatarBadge;
