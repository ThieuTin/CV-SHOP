import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Title from '../Title';

const propTypes = {
    information: PropTypes.array
};

const MoreInformation = ({ information }) => (
    <>
        <Title>More information</Title>
        <Table>
            <tbody>
                {information && information.map((item, index) => (
                    <tr key={index}>
                        <td className="title">{item.title}</td>
                        <td>{item.text}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
);

const Table = styled('table')(({ theme }) => ({
    width: '100%',
    '& td.title': {
        width: '35%',
        backgroundColor: theme.palette.background.default
    },
    '& td': {
        borderBottom: `2px solid ${theme.palette.background.default}`,
        borderTop: `2px solid ${theme.palette.background.default}`,
        padding: '15px'
    }
}));

MoreInformation.propTypes = propTypes;

export default MoreInformation;
