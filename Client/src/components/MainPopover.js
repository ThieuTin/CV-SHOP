import { makeStyles } from '@mui/styles';
import { Popover } from '@mui/material';

const useStyles = makeStyles(theme => ({
    popover: {
        pointerEvents: "none"
    },
    popoverContent: {
        pointerEvents: "auto"
    }
}));

const MainPopover = ({ children, onMouseEnter, onMouseLeave, anchorVer, anchorHor, transformVer, transformHor, ...props }) => {
    const classes = useStyles();
    return (
        <Popover
            className={classes.popover}
            classes={{
                paper: classes.popoverContent
            }}
            anchorOrigin={{
                vertical: anchorVer,
                horizontal: anchorHor
            }}
            transformOrigin={{
                vertical: transformVer,
                horizontal: transformHor
            }}
            PaperProps={{
                onMouseEnter,
                onMouseLeave
            }}
            {...props}
        >
            {children}
        </Popover>
    );
};

export default MainPopover;
