import { Field, FieldProps } from 'formik';
import React, {memo} from 'react';
import { CustomFieldProps } from '../field.interface';
import { RadioData } from './radio.interface';

const RadioGroup: React.FC<FieldProps & CustomFieldProps> = ({
    ...props
}) => {
    return <>
        <div role="group" aria-labelledby="my-radio-group">
            {props.dataToRender.map((item: RadioData) =>
                <label>
                    <Field {...props} type="radio" name={props.field.name} value={item.value} checked={props.field.value.includes(item.value)} />
                    {item.display}
                </label>
            )}
        </div>
    </>
}

export default memo(RadioGroup);