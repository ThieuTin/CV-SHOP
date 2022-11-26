import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Skeleton } from '@mui/material';

import Title from '../Title';
import ToggleShowAll from '../ToggleShowAll';
import categoryApi from '../../apis/categoryApi';

const propTypes = {
    id: PropTypes.string
};

const Categories = ({ id }) => {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        const getListCategory = async () => {
            try {
                const listCategory = await categoryApi.listCategory();
                setCategories(listCategory);
            } catch (error) {
                console.log(error);
            }
        };
        getListCategory();
    }, [])
    return (
        <Box id={id}>
            <Title>Categories</Title>
            <ToggleShowAll>
                <RootStyle
                    container
                    justifyContent="center"
                >
                    {categories && categories.map(category => (
                        <Grid item lg={2} sm={3} xs={6} key={category._id}>
                            <Link to={`/${category.slug}/cid${category._id}`}>
                                <Category>
                                    <Image data-src={category.image} alt={category.title} key={category._id} className='lazyload' />
                                    <Name title={category.title}>{category.title}</Name>
                                </Category>
                            </Link>
                        </Grid>
                    ))}
                    {!categories && [...Array(12)].map((_, index) => (
                        <Grid item lg={2} sm={3} xs={6} key={index}>
                            <Category>
                                <Skeleton variant="circular" width={49} height={49} />
                                <Skeleton variant="rectangular" width={80} height={45} />
                            </Category>
                        </Grid>
                    ))}
                </RootStyle>
            </ToggleShowAll>
        </Box>
    );
}

const RootStyle = styled(Grid)(({ theme }) => ({
    padding: '0 50px',
    marginBottom: '35px',
    maxHeight: '180px',
    overflowY: 'hidden',
    transition: 'all 0.5s',
    [theme.breakpoints.down('sm')]: {
        padding: 0
    }
}));

const Category = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    margin: '2px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.10)',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: '5px 3px 7px rgb(145 158 171 / 24%)',
    }
}));

const Image = styled('img')({
    width: '50px',
    height: '50px',
    borderRadius: '35%',
    marginRight: '15px',
});

const Name = styled('span')({
    width: '100%',
    fontSize: '14px',
    fontWeight: '400',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '&:hover': {
        color: '#f53d2d'
    }
});

Categories.propTypes = propTypes;

export default Categories;
