import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

import Slick from '../slick/Slick';
import { settingBanners } from '../slick/SlickSettings';

const propTypes = {
    id: PropTypes.string
};

const Banners = ({ id }) => (
    <Grid container id={id}>
        <Grid item md={8} sm={6} xs={12}>
            <Slick settings={settingBanners}>
                <Banner src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/cecb9772751131.5c27a9116babc.png" alt="" />
                <Banner src="https://image-us.eva.vn/upload/4-2018/images/2018-12-11/1-1544521514-549-width660height408.jpg" alt="" />
                <Banner src="https://product.hstatic.net/1000238589/product/shopee-640x360_24e81237c35b4081a16ee257790400bb_e268971403d94e62a191a17e14a5c144.jpg" alt="" />
                <Banner src="https://1.bp.blogspot.com/-lzRtthhzsNA/X8oM36M425I/AAAAAAAAPE0/-L1qMeqVfGMBup7frsuA6K170nkRKpggACLcBGAsYHQ/s1920/12.12%2B-%2BKV%2B1.jpg" alt="" />
                <Banner src="https://static.vecteezy.com/system/resources/previews/000/691/688/original/sale-banner-template-with-special-sale-vector.jpg" alt="" />
            </Slick>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
            <Banner src="https://doopage.com/assets/uploads/2019/05/dau-tu-hinh-anh-khi-ban-hang-tren-shopee.jpg" alt="" />
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
            <MiniBanner src="https://daygiare.com/public/storage/photo/2019/10/16/shopee-20-10-flashsale-giam-toi-50-re-vo-dich-danh-cho-nang-0.jpeg" alt="" />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
            <MiniBanner src="http://shopeeplus.com//upload/images/ma-giam-gia-shopee-01-1559789397.jpg" alt="" />
        </Grid>
    </Grid>
);

const Banner = styled('img')(({ theme }) => ({
    width: '100%',
    height: '400px',
    padding: '1px',
    [theme.breakpoints.down('sm')]: {
        height: '280px'
    }
}));

const MiniBanner = styled('img')({
    width: '100%',
    height: '150px',
    padding: '1px'
});

Banners.propTypes = propTypes;

export default Banners;
