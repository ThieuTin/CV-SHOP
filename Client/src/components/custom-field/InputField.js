import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const propTypes = {
    // Formik
    field: PropTypes.object,
    form: PropTypes.object,
    // Custom
    type: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string
};

const InputField = props => {
    const { field, form, type, label, color } = props;
    const { errors, touched } = form;
    const showError = errors[field.name] && touched[field.name];
    return (
        <TextField
            fullWidth
            type={type}
            label={label}
            color={color}
            {...field}
            error={showError}
            helperText={showError && errors[field.name]}
        />
    );
}

InputField.propTypes = propTypes;

export default InputField;
