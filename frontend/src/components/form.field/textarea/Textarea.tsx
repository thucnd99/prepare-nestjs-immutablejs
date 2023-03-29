import { Field } from 'formik';
import React, {memo} from 'react';
import { InputControlProps } from '../form.field.interface';

const TextArea: React.FC<InputControlProps> = ({
    ...props
}) => {
    return <>
        <Field as={props.type} {...props}
            className="form-item"
            name={props.name}
            placeholder={props.placeholder}
        />
    </>
}

export default memo(TextArea);