import { Field, FieldProps } from 'formik';
import React from 'react';
import { CustomFieldProps } from '../field.interface';

const TextArea: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <Field as='textarea' {...field} {...props}
            className="form-item"
            name={field.name}
            placeholder={props.placeholder}
        />
    </>
}

export default TextArea;