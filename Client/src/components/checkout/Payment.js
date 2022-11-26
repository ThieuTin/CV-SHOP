import { styled } from '@mui/material/styles';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';

import Image from '../Image';

const Payment = () => {
    return (
        <Stack sx={{ mb: 3 }}>
            <Typography variant='subtitle2' sx={{ my: 1 }}>2. Payment method</Typography>
            <Wrapper>
                <RadioGroup
                    value='female'
                >
                    <FormControlLabel
                        value='female'
                        control={<Radio />}
                        label={
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing={1}
                            >
                                <Image
                                    src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg'
                                    alt=''
                                />
                                <Typography variant='subtitle2'>Payment on delivery</Typography>
                            </Stack>
                        }
                    />
                </RadioGroup>
            </Wrapper>
        </Stack>
    );
};

const Wrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    padding: '15px'
}));

export default Payment;
