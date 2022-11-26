import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Stack, Breadcrumbs } from '@mui/material';

const propTypes = {
    header: PropTypes.string.isRequired,
    links: PropTypes.array,
    sx: PropTypes.object
};

const HeaderBreadCrumbs = ({ header, links, sx }) => {
    const renderBreadcrumbs = (
        <Breadcrumbs separator='>'>
            {links && links.map(link => (
                <Link
                    key={link.name}
                    component={RouterLink}
                    underline='none'
                    color='inherit'
                    to={link.href}
                    sx={{
                        fontSize: '14px'
                    }}
                >
                    {link.name}
                </Link>
            ))}
            <Typography color='primary'>
                {header}
            </Typography>
        </Breadcrumbs>
    );
    return (
        <Stack sx={sx} mb={1}>
            <Stack direction='row' alignItems='center'>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='h6'>
                        {header}
                    </Typography>
                    {renderBreadcrumbs}
                </Box>
            </Stack>
        </Stack>
    );
};

HeaderBreadCrumbs.propTypes = propTypes;

export default HeaderBreadCrumbs;
