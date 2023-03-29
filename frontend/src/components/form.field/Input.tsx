import { Field } from 'formik';
import React, { memo } from 'react';
import { InputControlProps } from './form.field.interface';

const Input: React.FC<InputControlProps> = ({
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