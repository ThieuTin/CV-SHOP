import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { Api, Navigation } from '@mui/icons-material';

const propTypes = {
    action: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.node,
            name: PropTypes.string
        })
    )
};

const Teleport = ({ actions }) => {
    return (
        <StyledDial
            ariaLabel="SpeedDial openIcon example"
            icon={<Api />}
        >
            <SpeedDialAction
                key='Teleport to the TOP'
                icon={<Navigation />}
                tooltipTitle='Teleport to the TOP'
                onClick={() => window.scrollTo(0, 0)}
            />
            {actions && actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                />
            ))}
        </StyledDial>
    );
};

const StyledDial = styled(SpeedDial)({
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    transition: '0.5s',
    '& svg': {
        transition: '1s',
        transform: 'rotate(0)'
    },
    '& .css-1s3wcjx-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab': {
        width: '50px',
        height: '50px',
        backgroundColor: '#f76254'
    },
    '& .css-1s3wcjx-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab:hover': {
        backgroundColor: '#f53c2a'
    },
    '& .css-4e90xm-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab': {
        width: '50px',
        height: '50px',
        backgroundColor: '#f76254',
        color: '#fff'
    },
    '& .css-4e90xm-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab:hover': {
        backgroundColor: '#f76254'
    },
    '& .css-1s3wcjx-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab:hover svg, .css-4e90xm-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab:hover svg': {
        transform: 'rotate(360deg)'
    }
});

Teleport.propTypes = propTypes;

export default Teleport;
