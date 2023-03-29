import { Field, FieldHelperProps, FieldInputProps } from 'formik';
import React, { memo } from 'react';
import { CustomFieldProps } from './field.interface';

const Input: React.FC<CustomFieldProps&FieldHelperProps<any>&FieldInputProps<any>> = ({
    ...props
}) => {
    return <>
        <Field {...props}
            className="form-item"
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
        />
    </>
}

export default memo(Input);