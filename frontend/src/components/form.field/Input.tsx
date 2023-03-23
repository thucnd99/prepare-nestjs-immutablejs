import { Field, FieldProps } from 'formik';
import React, { memo } from 'react';
import { CustomFieldProps } from './field.interface';

const Input: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue },
    ...props
}) => {
    return <>
        <Field {...field} {...props}
            className="form-item"
            name={field.name}
            type={props.type}
            placeholder={props.placeholder}
        />
    </>
}

export default memo(Input);