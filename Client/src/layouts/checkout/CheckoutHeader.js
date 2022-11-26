import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { Step, StepLabel, Stepper } from '@mui/material';

import { HEADER_HEIGHT, MAIN_PADDING } from '../../constant';
import Logo from '../../components/Logo';
import Image from '../../components/Image';

const STEPS = [
    'Sign in',
    'Shipping address',
    'Order & Payment',
];

const CheckoutHeader = () => {
    const location = useLocation();
    const currentPage = location.pathname.split('/').pop();
    return (
        <HeaderContainer>
            <Logo />
            <Stepper activeStep={currentPage === 'shipping' ? 1 : 2} alternativeLabel sx={{ width: '80%' }}>
                {STEPS.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Hotline title='Cre from Tiki :D'>
                <Image
                    src='https://frontend.tikicdn.com/_desktop-next/static/img/hotline.png'
                    alt=''
                />
            </Hotline>
        </HeaderContainer>
    );
};

const HeaderContainer = styled('div')(({ theme }) => ({
    height: HEADER_HEIGHT,
    padding: MAIN_PADDING,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        padding: '5px'
    }
}));

const Hotline = styled('div')({
    height: '42px',
    width: '176px',
});

export default CheckoutHeader;
