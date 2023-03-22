import { Field, FieldProps } from 'formik';
import React from 'react';
import { CustomFieldProps } from '../field.interface';
import { RadioData } from './radio.interface';

const RadioGroup: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <div role="group" aria-labelledby="my-radio-group">
            {props.dataToRender.map((item: RadioData) =>
                <label>
                    <Field {...field} {...props} type="radio" name={field.name} value={item.value} checked={field.value.includes(item.value)} />
                    {item.display}
                </label>
            )}
        </div>
    </>
}

export default RadioGroup;