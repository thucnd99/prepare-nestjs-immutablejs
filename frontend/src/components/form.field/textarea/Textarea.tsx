import { Field, FieldHelperProps, FieldInputProps } from 'formik';
import React, {memo} from 'react';
import { CustomFieldProps } from '../field.interface';

const TextArea: React.FC<CustomFieldProps&FieldInputProps<any>&FieldHelperProps<any>> = ({
    ...props
}) => {
    return <>
        <Field as='textarea' {...props}
            className="form-item"
            name={props.name}
            placeholder={props.placeholder}
        />
    </>
}

export default memo(TextArea);