import { Field, FieldProps } from 'formik';
import React from 'react';
import { CustomFieldProps } from '../field.interface';

const Radio: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <label>
            <Field {...field} {...props} type="radio" name={field.name} checked={field.value === props.dataToRender.value} value={props.dataToRender.value} />
            {props.dataToRender.display}
        </label>
    </>
}

export default Radio;