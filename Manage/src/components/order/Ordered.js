import { styled } from '@mui/material/styles';
import { Stack, Box, Typography } from '@mui/material';

// utils
import { toVND } from '../../utils/formatMoney';

const Ordered = ({ ordered }) => {
    return (
        <Stack>
            {ordered && ordered.map(item => {
                const { _id, images, name, amount, VATFee, price } = item;
                return (
                    <Item key={_id}>
                        <VAT>{VATFee > 0 ? toVND(VATFee) : 'Freeship'}</VAT>
                        <Box
                            component='img'
                            src={images[0]}
                            alt={name}
                            sx={{ width: '86px', height: '86px' }}
                        />
                        <Stack sx={{ width: 'calc(100% - 95px)' }}>
                            <Name>
                                <Typography variant='body2'>
                                    {name}
                                </Typography>
                            </Name>
                            <Typography variant='subtitle2'>{toVND(price)} | x{amount}</Typography>
                        </Stack>
                    </Item>
                )
            })}
        </Stack>
    );
};

const Item = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: '5px',
    padding: '15px',
    margin: '0 0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px dashed green'
}));

const Name = styled('div')({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden'
});

const VAT = styled('span')({
    position: 'absolute',
    top: '5px',
    right: '15px',
    display: 'block',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#F53D2D'
});

export default Ordered;
