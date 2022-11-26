import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

const NavItem = ({ item, active }) => {
    const theme = useTheme();
    const { title, path, icon, children } = item;
    const isActiveRoot = active(path);
    const [open, setOpen] = useState(isActiveRoot);
    const activeRootStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium',
        bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:before': { display: 'block' }
    };
    const activeSubStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium'
    };
    const handleOpen = () => {
        setOpen(prev => !prev);
    };
    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot && activeRootStyle)
                    }}
                >
                    <ListItemIconStyle
                        sx={{ color: isActiveRoot ? 'primary.main' : '' }}
                    >
                        {icon && icon}
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                    {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                </ListItemStyle>

                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {children.map(item => {
                            const { title, path } = item;
                            const isActiveSub = active(path);
                            return (
                                <ListItemStyle
                                    key={title}
                                    component={RouterLink}
                                    to={path}
                                    sx={{
                                        ...(isActiveSub && activeSubStyle)
                                    }}
                                >
                                    <ListItemIconStyle>
                                        <Box
                                            component='span'
                                            sx={{
                                                width: 4,
                                                height: 4,
                                                display: 'flex',
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'text.disabled',
                                                transition: theme => theme.transitions.create('transform'),
                                                ...(isActiveSub && {
                                                    transform: 'scale(2)',
                                                    bgcolor: 'primary.main'
                                                })
                                            }}
                                        />
                                    </ListItemIconStyle>
                                    <ListItemText disableTypography primary={title} />
                                </ListItemStyle>
                            );
                        })}
                    </List>
                </Collapse>
            </>
        );
    }

    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot && activeRootStyle)
            }}
        >
            <ListItemIconStyle
                sx={{ color: isActiveRoot ? 'primary.main' : '' }}
            >
                {icon && icon}
            </ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
        </ListItemStyle>
    );
};

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
    ...theme.typography.subtitle2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
        top: 0,
        right: 0,
        width: 3,
        bottom: 0,
        content: "''",
        position: 'absolute',
        display: 'none',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: theme.palette.primary.main
    }
}));

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

NavItem.propTypes = {
    item: PropTypes.object,
    active: PropTypes.func
};

// -----------------------------------------------------------------------

const SidebarSection = ({ navConfig }) => {
    const { pathname } = useLocation();
    const match = path => {
        return path
            ? !!matchPath({ path, end: false }, pathname)
            : false
    };
    return (
        <Box>
            {navConfig.map((list, index) => {
                const { subheader, items } = list;
                return (
                    <List key={index} disablePadding>
                        {subheader && <ListSubheaderStyle>{subheader}</ListSubheaderStyle>}
                        {items.map(item => (
                            <NavItem key={item.title} item={item} active={match} />
                        ))}
                    </List>
                )
            })}
        </Box>
    );
};

const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
    ...theme.typography.overline,
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    color: theme.palette.text.primary,
    backgroundColor: 'transparent'
}));

SidebarSection.propTypes = {
    navConfig: PropTypes.array
};

export default SidebarSection;
