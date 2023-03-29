import { Field, FieldHelperProps, FieldInputProps } from 'formik';
import React, {memo} from 'react';
import { CustomFieldProps } from '../field.interface';
import { RadioData } from './radio.interface';

const RadioGroup: React.FC<CustomFieldProps&FieldHelperProps<any>&FieldInputProps<any>> = ({
    ...props
}) => {
    return <>
        <div role="group" aria-labelledby="my-radio-group">
            {props.dataToRender.map((item: RadioData) =>
                <label>
                    <Field {...props} type="radio" name={props.name} value={item.value} checked={props.value.includes(item.value)} />
                    {item.display}
                </label>
            )}
        </div>
    </>
}

export default memo(RadioGroup);