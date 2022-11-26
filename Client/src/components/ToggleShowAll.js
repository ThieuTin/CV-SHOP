import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const propTypes = {
    children: PropTypes.node
};

// Children mush have className="toggle-wrapper"
const ToggleShowAll = ({ children }) => (
    <RootStyle style={{ position: 'relative' }}>
        <Input type="checkbox" id="toggle-input" />
        <ToggleButton htmlFor="toggle-input">
            <i className="bi bi-chevron-double-down"></i>
        </ToggleButton>
        {children}
    </RootStyle>
);

const RootStyle = styled('div')({
    position: 'relative'
});

const ToggleButton = styled('label')({
    position: 'absolute',
    top: 'calc(100% - 20px)',
    left: 'calc(50% - 20px)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.5)',
    boxShadow: '0px -2px 7px rgb(1 1 1 / 15%)',
    transition: '0.5s',
    lineHeight: '40px',
    textAlign: 'center',
    fontSize: '17px',
    zIndex: 9,
    '&:hover': {
        backgroundColor: '#f53d2d',
        color: '#fff'
    }
});

const Input = styled('input')({
    width: 0,
    height: 0,
    display: 'none',
    '&:checked + label': {
        transform: 'rotate(180deg)',
        backgroundColor: '#f95b4c',
        color: '#fff',
        boxShadow: '0px -2px 7px rgb(233 129 129)'
    },
    '&:checked ~ div': {
        maxHeight: '1000px'
    }
});

ToggleShowAll.propTypes = propTypes;

export default ToggleShowAll;
