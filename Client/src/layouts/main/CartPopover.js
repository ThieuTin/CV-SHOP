import { Link } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const CartPopover = () => {
    const { totalItem } = useSelector(state => state.cart);
    return (
        <Badge
            badgeContent={totalItem}
            max={99}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            sx={{ m: 1 }}
        >
            <Link to='/cart'>
                <IconButton color='error'>
                    <ShoppingCartOutlined />
                </IconButton>
            </Link>
        </Badge>
    );
};

export default CartPopover;


// import { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import { Stack, Badge, IconButton, Typography } from '@mui/material';
// import { ShoppingCart } from '@mui/icons-material';

// import MainPopover from '../../components/MainPopover';
// import Image from '../../components/Image';

// const CartPopover = () => {
//     const anchorCart = useRef(null);
//     const [openedPopover, setOpenedPopover] = useState(false);

//     const popoverEnter = () => {
//         setOpenedPopover(true);
//     };
//     const popoverLeave = () => {
//         setOpenedPopover(false);
//     };
//     return (
//         <>
//             <Badge
//                 badgeContent={100}
//                 max={99}
//                 anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'left'
//                 }}
//                 sx={{ m: 1 }}
//                 ref={anchorCart}
//                 onMouseEnter={popoverEnter}
//                 onMouseLeave={popoverLeave}
//             >
//                 <Link to='/cart'>
//                     <IconButton sx={{ color: '#f76254' }}>
//                         <ShoppingCart />
//                     </IconButton>
//                 </Link>
//             </Badge>
//             <MainPopover
//                 open={openedPopover}
//                 anchorEl={anchorCart.current}
//                 anchorVer="bottom"
//                 anchorHor="center"
//                 transformVer="top"
//                 transformHor="center"
//                 onMouseEnter={popoverEnter}
//                 onMouseLeave={popoverLeave}
//             >
//                 <Stack
//                     spacing={1}
//                     sx={{ width: '400px', p: 2 }}
//                 >
//                     <Typography variant='caption'>
//                         Recently added products...
//                     </Typography>
//                     <StoredList>
//                         {[...Array(6)].map((_, index) => (
//                             <Link to='/cart' key={index}>
//                                 <StoredChild
//                                     direction='row'
//                                     alignItems='center'
//                                     spacing={1}
//                                 >
//                                     <Image
//                                         src='https://salt.tikicdn.com/cache/400x400/ts/product/a7/ff/d8/7932c139653524af862790945b9c33fb.jpg.webp'
//                                         alt=''
//                                         sx={{ width: '60px', height: '60px' }}
//                                     />
//                                     <ChildName variant='subtitle2'>
//                                         <SaleTag>-4%</SaleTag>
//                                         Đèn bắt muỗi diệt côn trùng hình thú cao cấp quạt hút thông minh công nghệ đèn LED thế hệ mới MX36
//                                     </ChildName>
//                                     <Typography variant='subtitle2' sx={{ width: '70px', textAlign: 'center', wordBreak: 'break-all' }}>
//                                         {parseInt('2000000000').toLocaleString('vi', { style: 'currency', currency: 'VND' })}
//                                     </Typography>
//                                 </StoredChild>
//                             </Link>
//                         ))}
//                     </StoredList>
//                 </Stack>
//             </MainPopover>
//         </>
//     );
// };

// const StoredList = styled('div')({
//     maxHeight: '360px',
//     overflowY: 'scroll',
//     '&::-webkit-scrollbar': {
//         display: 'none'
//     }
// });

// const StoredChild = styled(Stack)(({ theme }) => ({
//     marginBlock: '5px',
//     '&:hover': {
//         backgroundColor: theme.palette.background.default
//     }
// }));

// const ChildName = styled(Typography)({
//     width: '210px',
//     textOverflow: 'ellipsis',
//     overflow: 'hidden',
//     display: '-webkit-box',
//     WebkitLineClamp: 2,
//     WebkitBoxOrient: 'vertical'
// });

// const SaleTag = styled('div')({
//     display: 'inline',
//     margin: '5px',
//     width: '30px',
//     padding: '0px 2px',
//     fontSize: '12px',
//     fontWeight: '400',
//     border: '1px solid rgb(255, 66, 78)',
//     borderRadius: '2px',
//     backgroundColor: 'rgb(255, 240, 241)',
//     color: 'rgb(255, 66, 78)'
// });

// export default CartPopover;
