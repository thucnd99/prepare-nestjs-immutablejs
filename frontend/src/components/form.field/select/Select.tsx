import { Field } from 'formik';
import React, {memo} from 'react';
import { InputControlProps } from '../form.field.interface';
import { OptionData } from './select.interface';

const Select: React.FC<InputControlProps> = ({
    ...props
}) => {
    return <>
        <Field as={props.type} className="form-item"
            {...props}
            placeholder={props.placeholder}>
            {props.dataToRender.map((v: OptionData) =>
                <option selected={props.value === v.value} value={v.value} >{v.display}</option>
            )}
        </Field>
    </>
}

export default memo(Select);