import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

import AvatarBadge from '../AvatarBadge';

const propTypes = {
    status: PropTypes.string
};

const ResponseChild = ({ status }) => (
    <Stack direction='row' sx={{ m: '5px' }}>
        <AvatarBadge
            status={status}
            width={50}
            height={50}
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}
        />
        <Message>
            <Stack direction='row' alignItems='center' spacing={1}>
                <AvatarBadge
                    status={status}
                    width={20}
                    height={20}
                    sx={{ display: { xs: 'flex', md: 'none', lg: 'none' } }}
                />
                <Typography component='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                Nguyen Van A
                </Typography>
                <Typography variant='caption'>12/12/2022</Typography>
            </Stack>
            <Typography variant='subtitle1'>
            Sản phẩm rất tốt !
            </Typography>
        </Message>
    </Stack>
);

const Message = styled(Stack)(({ theme }) => ({
    width: 'calc(100% - 50px)',
    padding: '10px',
    marginLeft: '10px',
    backgroundColor: theme.palette.background.default,
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        margin: 0
    }
}));

ResponseChild.propTypes = propTypes;

export default ResponseChild;
