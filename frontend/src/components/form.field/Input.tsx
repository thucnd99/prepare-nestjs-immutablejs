import { Field, FieldProps } from 'formik';
import React, { memo } from 'react';
import { CustomFieldProps } from './field.interface';

const Input: React.FC<FieldProps & CustomFieldProps> = ({
    ...props
}) => {
    return <>
        <Field {...props}
            className="form-item"
            name={props.field.name}
            type={props.type}
            placeholder={props.placeholder}
        />
    </>
}

export default memo(Input);