import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Button } from '@mui/material';
import { ThumbUpOutlined, ChatOutlined } from '@mui/icons-material';

import Title from '../Title';
import Stars from '../Stars';
import AvatarBadge from '../AvatarBadge';
import ResponseChild from './ResponseChild';

const propTypes = {
    status: PropTypes.string
};

const Comment = ({ status }) => (
    <RootStyle direction='row'>
        <Stack
            sx={{ width: '335px', display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}
            alignItems='center'
        >
            <AvatarBadge status={status} width={60} height={60} />
            <Title sx={{ pb: 0 }}>Lê Chính Tuệ</Title>
            <Typography variant='body2'>Joined 4 years ago</Typography>
        </Stack>
        <Stack
            sx={{ width: { xs: '100%', lg: 'calc(100% - 335px)' } }}
        >
            <Stack
                direction='row'
                alignItems='center'
                sx={{ display: { xs: 'flex', md: 'none', lg: 'none' }, mb: '10px' }}
            >
                <AvatarBadge status={status} width={30} height={30} />
                <Stack sx={{ mx: 2 }}>
                    <Title sx={{ p: 0 }}>Lê Chính Tuệ</Title>
                    <Typography variant='body2'>Joined 4 years ago</Typography>
                </Stack>
            </Stack>
            <Stack direction='row'>
                <Stars total={5} rating={5} />
                <Title sx={{ p: 0, px: 1, fontSize: '15px' }}>Very good</Title>
            </Stack>
            <Typography variant='subtitle1'>
                Mình đặt hàng khi em này đề giá 999k, thêm cái mã giảm được 40k. Mò mẫm em nửa ngày rút ra vài thông tin: Về sản phẩm: - Đầy đủ phụ kiện, bảng vẽ mới cóng không trầy xước - Nặng hơn H610 pro v2. Nếu H610 mỏng nhẹ và hơi cong ở hai mép thì em này mặt dưới phẳng hoàn toàn - Độ bền chưa rõ, nhưng thấy hoạt động ok - Cảm giác tiếp xúc giữa đầu bút và mặt bảng hơi nhám, với mình thì chấp nhận được Về kết nối: - Vào huion.com/download tải driver rồi cài đặt - Cắm bảng vẽ vào lap và mở driver để điều chỉnh các thông số (giao diện driver như hình) - Từ đây có thể kích hoạt các nút bấm, đổi chức năng cho nút bấm ở mục "Press keys". Ví dụ: dùng phím tắt Clrl + Z (lệnh undo) cho nút đầu tiên - Dùng paint tool sai ĐỪNG chọn Enable Window Ink ở mục "Digital Pen", nếu không nét sẽ thô cứng. - Chọn Mouse mode để xài như chuột Giao hàng: - Hộp móp góc - Hàng quốc tế có nhắc trước thời gian giao là tương đối, nhưng tiki vẫn nhắn tin xin lỗi hàng đến trễ 1 ngày nên ok hài lòng - Bạn shipper lịch sự cám ơn khách. Xin lỗi bạn shipper vì quá trông mong và mê mẩn con hàng mà quên cảm ơn lại :)))
            </Typography>
            <Typography variant='body2' sx={{ px: 1 }}>Review at 14/11/2020</Typography>
            <Stack direction='row'>
                <StyledButton variant='outlined' startIcon={<ThumbUpOutlined />}>
                    Helpful (69)
                </StyledButton>
                <StyledButton variant='outlined' startIcon={<ChatOutlined />}>
                    Reply
                </StyledButton>
            </Stack>
            <Stack>
                <ResponseChild status="online" />
                <ResponseChild status="offline" />
            </Stack>
        </Stack>
    </RootStyle>
);

const RootStyle = styled(Stack)(({ theme }) => ({
    padding: '20px 0',
    borderBottom: `2px solid ${theme.palette.background.default}`,
    borderTop: `2px solid ${theme.palette.background.default}`
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    margin: '5px',
    transition: '0.3s',
    '&:first-of-type:hover': {
        backgroundColor: '#2196f3',
        color: '#fff'
    }
}));

Comment.propTypes = propTypes;

export default Comment;
