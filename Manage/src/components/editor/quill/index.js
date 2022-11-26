import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import QuillEditorToolbar, { formats } from './QuillEditorToolbar';

const propTypes = {
    id: PropTypes.string
};

const QuillEditor = ({ id, ...other }) => {
    const modules = {
        toolbar: {
            container: `#${id}`
        }
    };
    return (
        <RootStyle>
            <QuillEditorToolbar id={id} />
            <ReactQuill
                modules={modules}
                formats={formats}
                placeholder='Write something amazing for your project here....'
                {...other}
            />
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    border: '1px solid rgba(145, 158, 171, 0.32)',
    '& .ql-editor': {
        minHeight: '300px',
        '& pre.ql-syntax': {
            ...theme.typography.body2,
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.grey[900]
        }
    }
}));

QuillEditor.propTypes = propTypes;

export default QuillEditor;
