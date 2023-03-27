import { Field, FieldProps } from 'formik';
import React, {memo} from 'react';
import { CustomFieldProps } from '../field.interface';

const TextArea: React.FC<FieldProps & CustomFieldProps> = ({
    ...props
}) => {
    return <>
        <Field as='textarea' {...props}
            className="form-item"
            name={props.field.name}
            placeholder={props.placeholder}
        />
    </>
}

export default memo(TextArea);