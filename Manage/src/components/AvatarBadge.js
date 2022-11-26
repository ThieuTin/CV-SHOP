import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Avatar, Badge } from '@mui/material';

const propTypes = {
    image: PropTypes.string,
    status: PropTypes.string,
    sx: PropTypes.object
};

const AvatarBadge = ({ image = null, status, sx }) => {
    const activeStatusStyle = {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: '0 0 0 2px #fff',
        '&::after': {
            animation: 'ripple 1.2s infinite ease-in-out'
        }
    };
    return (
        <StatusBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            sx={{
                ...sx,
                '& .MuiBadge-badge': {
                    ...(status === 'online' && activeStatusStyle)
                }
            }}
        >
            <Avatar
                src={image ? image : ''}
                alt='Le Chinh Tue'
                sx={{ width: '100%', height: '100%' }}
            />
        </StatusBadge>
    );
};

const StatusBadge = styled(Badge)({
    '& .MuiBadge-badge': {
        backgroundColor: '#ccc',
        color: '#ccc',
        boxShadow: '#ccc',
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
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
});

AvatarBadge.propTypes = propTypes;

export default AvatarBadge;
