import { Field, FieldHelperProps, FieldInputProps } from 'formik';
import React, {memo} from 'react';
import { CustomFieldProps } from '../field.interface';
import { OptionData } from './select.interface';

const Select: React.FC<CustomFieldProps&FieldHelperProps<any>&FieldInputProps<any>> = ({
    ...props
}) => {
    return <>
        <Field as='select' className="form-item"
            {...props}
            placeholder={props.placeholder}>
            {props.dataToRender.map((v: OptionData) =>
                <option selected={props.value === v.value} value={v.value} >{v.display}</option>
            )}
        </Field>
    </>
}

export default memo(Select);