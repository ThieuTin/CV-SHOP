import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { StarRounded, StarRateTwoTone } from '@mui/icons-material';

import Title from '../Title';
import Stars from '../Stars';
import Comment from './Comment';

const propTypes = {
    totalRating: PropTypes.object
};

const Review = ({ rating }) => {
    return (
        <Fragment>
            <Title>Ratings - Reviews from customers</Title>
            {rating && rating.total > 0 && (
                <Fragment>
                    <Stack direction={{ xs: 'column', md: 'row', lg: 'row' }} sx={{ mb: '20px' }}>
                        <Stack sx={{ width: '335px' }}>
                            <Stack direction='row' alignItems='center'>
                                <Typography variant='h3' sx={{ p: 2 }}>{rating.average}</Typography>
                                <Stack justifyContent='center'>
                                    <Stars total={5} rating={parseFloat(rating.average)} />
                                    <Typography variant='body2'>{rating.total} ratings</Typography>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Stack direction='row' alignItems='center'>
                                    <Stars total={5} rating={5} />
                                    <Range total={rating.total} votes={rating.fiveStar} />
                                    <Typography variant='body2'>{rating.fiveStar}</Typography>
                                </Stack>
                                <Stack direction='row' alignItems='center'>
                                    <Stars total={5} rating={4} />
                                    <Range total={rating.total} votes={rating.fourStar} />
                                    <Typography variant='body2'>{rating.fourStar}</Typography>
                                </Stack>
                                <Stack direction='row' alignItems='center'>
                                    <Stars total={5} rating={3} />
                                    <Range total={rating.total} votes={rating.threeStar} />
                                    <Typography variant='body2'>{rating.threeStar}</Typography>
                                </Stack>
                                <Stack direction='row' alignItems='center'>
                                    <Stars total={5} rating={2} />
                                    <Range total={rating.total} votes={rating.twoStar} />
                                    <Typography variant='body2'>{rating.twoStar}</Typography>
                                </Stack>
                                <Stack direction='row' alignItems='center'>
                                    <Stars total={5} rating={1} />
                                    <Range total={rating.total} votes={rating.oneStar} />
                                    <Typography variant='body2'>{rating.oneStar}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography variant='subtitle1'>Filter reviews by</Typography>
                            <Stack direction='row' alignItems='center'>
                                <Filter>Mới nhất</Filter>
                                <Filter>5 <StarRounded fontSize='small' sx={{ color: 'rgb(253, 216, 54)' }} /></Filter>
                                <Filter>4 <StarRounded fontSize='small' sx={{ color: 'rgb(253, 216, 54)' }} /></Filter>
                                <Filter>3 <StarRounded fontSize='small' sx={{ color: 'rgb(253, 216, 54)' }} /></Filter>
                                <Filter>2 <StarRounded fontSize='small' sx={{ color: 'rgb(253, 216, 54)' }} /></Filter>
                                <Filter>1 <StarRounded fontSize='small' sx={{ color: 'rgb(253, 216, 54)' }} /></Filter>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Comment status="online" />
                        <Comment status="offline" />
                        <Comment status="online" />
                    </Stack>
                </Fragment>
            )}
            {rating && rating.total <= 0 && (
                <Stack alignItems='center' spacing={1} sx={{ width: '100%', py: 3 }}>
                    <StarRateTwoTone color='warning' sx={{ fontSize: 'xxx-large' }} />
                    <Typography variant='subtitle1'>There are no reviews for this product yet</Typography>
                </Stack>
            )}
        </Fragment>
    );
};

const Range = styled('div')(({ votes, total }) => ({
    width: '150px',
    height: '6px',
    backgroundColor: 'rgb(238, 238, 238)',
    position: 'relative',
    zIndex: 1,
    margin: '0px 6px',
    borderRadius: '99em',
    '&:before': {
        content: '""',
        width: `calc(100%*${votes}/${total})`,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgb(120, 120, 120)',
        borderRadius: '99em'
    }
}));

const Filter = styled('div')(({ theme }) => ({
    display: 'flex',
    fontSize: '14px',
    padding: '10px 17px',
    borderRadius: '20px',
    backgroundColor: theme.palette.background.default,
    margin: '0px 12px 12px 0px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f53d2d',
        color: '#fff',
        transition: '0.5s'
    }
}));

Review.propTypes = propTypes;

export default Review;
