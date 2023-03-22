import { Field, FieldProps } from 'formik';
import React from 'react';
import { CustomFieldProps } from '../field.interface';
import { OptionData } from './select.interface';

const Select: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    ...props
}) => {
    return <>
        <Field as='select' className="form-item"
            {...field} {...props}
            placeholder={props.placeholder}>
            {props.dataToRender.map((v: OptionData) =>
                <option selected={field.value === v.value} value={v.value} >{v.display}</option>
            )}
        </Field>
    </>
}

export default Select;