import { Link } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';
import { FavoriteBorderOutlined } from '@mui/icons-material';

const FavoritePopover = () => (
    <Badge
        badgeContent={100}
        max={99}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
        }}
        sx={{ m: 1 }}
    >
        <Link to='/favorite'>
            <IconButton color='error'>
                <FavoriteBorderOutlined />
            </IconButton>
        </Link>
    </Badge>
);

export default FavoritePopover;


// import { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Stack, Badge, IconButton } from '@mui/material';
// import { Favorite } from '@mui/icons-material';

// import MainPopover from '../../components/MainPopover';

// const FavoritePopover = () => {
//     const anchorFavorite = useRef(null);
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
//                 ref={anchorFavorite}
//                 onMouseEnter={popoverEnter}
//                 onMouseLeave={popoverLeave}
//             >
//                 <Link to='/favorite'>
//                     <IconButton sx={{ color: '#f76254' }}>
//                         <Favorite />
//                     </IconButton>
//                 </Link>
//             </Badge>
//             <MainPopover
//                 open={openedPopover}
//                 anchorEl={anchorFavorite.current}
//                 anchorVer="bottom"
//                 anchorHor="center"
//                 transformVer="top"
//                 transformHor="center"
//                 onMouseEnter={popoverEnter}
//                 onMouseLeave={popoverLeave}
//             >
//                 <Stack
//                     sx={{ width: '400px', p: 2 }}
//                 >
//                     <h3>Favorite</h3>
//                 </Stack>
//             </MainPopover>
//         </>
//     );
// };

// export default FavoritePopover;
