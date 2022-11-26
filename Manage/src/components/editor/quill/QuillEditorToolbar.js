import PropTypes from 'prop-types';
import { Quill } from 'react-quill';

const FONT_FAMILY = ['Roboto', 'Raleway', 'Montserrat', 'Lato', 'Rubik'];

const FONT_SIZE = [
    '8px',
    '9px',
    '10px',
    '12px',
    '14px',
    '16px',
    '20px',
    '24px',
    '32px',
    '42px',
    '54px',
    '68px',
    '84px',
    '98px'
];
const HEADINGS = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'];

const Size = Quill.import('formats/size');
Size.whitelist = FONT_SIZE;
Quill.register(Size, true);

const Font = Quill.import('formats/font');
Font.whitelist = FONT_FAMILY;
Quill.register(Font, true);

export const formats = [
    'align',
    'background',
    'blockquote',
    'bold',
    'bullet',
    'code',
    'code-block',
    'color',
    'direction',
    'font',
    'formula',
    'header',
    'image',
    'indent',
    'italic',
    'link',
    'list',
    'script',
    'size',
    'strike',
    'table',
    'underline',
    'video'
];

const propTypes = {
    id: PropTypes.string.isRequired
};

const QuillEditorToolbar = ({ id }) => {
    return (
        <div id={id}>
            <div className='ql-formats'>
                <select className="ql-header" defaultValue="">
                    {HEADINGS.map((heading, index) => (
                        <option key={heading} value={index + 1}>
                            {heading}
                        </option>
                    ))}
                    <option value="">Normal</option>
                </select>
            </div>

            <div className="ql-formats">
                <button type="button" className="ql-bold" />
                <button type="button" className="ql-italic" />
                <button type="button" className="ql-underline" />
                <button type="button" className="ql-strike" />
            </div>

            <div className="ql-formats">
                <button type="button" className="ql-list" value="ordered" />
                <button type="button" className="ql-list" value="bullet" />
            </div>

            <div className="ql-formats">
                <button type="button" className="ql-direction" value="rtl" />
                <select className="ql-align" />
            </div>

            <div className="ql-formats">
                <button type="button" className="ql-link" />
                <button type="button" className="ql-image" />
                <button type="button" className="ql-video" />
            </div>

            <div className="ql-formats">
                <button type="button" className="ql-clean" />
            </div>
        </div>
    );
};

QuillEditorToolbar.propTypes = propTypes;

export default QuillEditorToolbar;
