import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
    Stack,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton
} from '@mui/material';
import { Favorite, AddShoppingCart, FindInPage } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { PATH_AUTH } from '../routes/path';
import { getToken } from '../utils/jwt';
import { addCart } from '../redux/slices/cart';
import { CARD_WIDTH } from '../constant';
import { toVND } from '../utils/formatMoney';
import Stars from './Stars';

const CARD = {
    WIDTH: CARD_WIDTH,
    HEIGHT: 'auto'
};

const propTypes = {
    product: PropTypes.object
};

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tokens = getToken();
    const { _id, images, rating, name, slug, sold, price, discount } = product;
    const { average, total } = rating;
    const handleAddCart = () => {
        if (tokens) {
            dispatch(addCart({
                productId: _id,
                quantity: 1
            }));
        } else {
            const { pathname } = history.location;
            history.push(PATH_AUTH.login, { from: pathname });
        }
    };
    return (
        <RootStyle>
            <Link to={`/${slug}/pid=${_id}`}>
                <ImageWrapper>
                    <Image
                        component="img"
                        height="200"
                        data-src={images[0]}
                        alt='Image...'
                        className='lazyload'
                    />
                </ImageWrapper>
                <CardContent sx={{ height: '100px' }}>
                    {/* Product Name */}
                    <Name>
                        <Typography variant='body2' title={name}>
                            {name}
                        </Typography>
                    </Name>
                    {/* Product rating & sold */}
                    <Stack direction='row' spacing={1} alignItems='center'>
                        {total > 0 && (
                            <Stars total={5} rating={average} sx={{ fontSize: '14px' }} />
                        )}
                        <Typography variant='caption'>
                            {sold !== 0 && `${sold} Sold`}
                        </Typography>
                    </Stack>
                    {/* Product Price */}
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Price tag={discount !== 0 ? 'sale' : 'normal'}>
                            {discount === 0
                                ? toVND(price)
                                : toVND(price - price * discount / 100)
                            }
                        </Price>
                        {discount !== 0 && <SaleTag>-{discount}%</SaleTag>}
                    </Stack>
                </CardContent>
            </Link>
            <CardActions>
                <IconButton aria-label="add to carts" onClick={handleAddCart}>
                    <AddShoppingCart />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <Link to={`/${slug}/pid=${_id}`}>
                    <IconButton aria-label="add to favorites">
                        <FindInPage />
                    </IconButton>
                </Link>
            </CardActions>
        </RootStyle>
    );
}

const RootStyle = styled(Card)(({ theme }) => ({
    width: CARD.WIDTH,
    position: 'relative',
    borderRadius: '5px',
    margin: '1px',
    padding: '10px',
    backgroundImage: 'none',
    boxShadow: '3px 2px 5px rgba(180,180,180,0.1)',
    '&:hover': {
        boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 20px',
        zIndex: 1
    },
    '& .MuiCardContent-root': {
        padding: '2px 8px'
    },
    '& .MuiCardActions-root': {
        padding: 0
    },
    [theme.breakpoints.down('sm')]: {
        width: '180px',
        margin: '2px',
        '& .MuiCardMedia-root': {
            height: '155px'
        }
    }
}));

const ImageWrapper = styled('div')({
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '5px',
});

const Image = styled(CardMedia)({
    transition: '0.3s',
    borderRadius: '5px',
    '&:hover': {
        transform: 'scale(1.1)'
    }
});

const Name = styled('div')({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    '&:hover': {
        color: 'red'
    }
});

const SaleTag = styled('div')({
    padding: '0px 2px',
    fontSize: '12px',
    fontWeight: '400',
    border: '1px solid rgb(255, 66, 78)',
    borderRadius: '2px',
    backgroundColor: 'rgb(255, 240, 241)',
    color: 'rgb(255, 66, 78)'
});

const Price = styled(Typography)(({ tag, theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px',
    color: tag === 'sale' ? 'red' : theme.palette.text.primary
}));

ProductCard.propTypes = propTypes;

export default ProductCard;
