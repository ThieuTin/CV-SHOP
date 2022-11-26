import { IconButton, Badge } from '@mui/material';
import { NotificationsActiveOutlined } from '@mui/icons-material';

const NotificationsPopover = () => {
    return (
        <IconButton>
            <Badge badgeContent={10} color='error'>
                <NotificationsActiveOutlined />
            </Badge>
        </IconButton>
    );
};

export default NotificationsPopover;
