import { Field } from 'formik';
import React, {memo} from 'react';
import { FieldControlProps } from '../form.field.interface';
import { RadioData } from './radio.interface';

const RadioGroup: React.FC<FieldControlProps> = ({
    ...props
}) => {
    return <>
        <div role="group" aria-labelledby="my-radio-group">
            {props.dataToRender.map((item: RadioData) =>
                <label>
                    <Field {...props} type={props.type} name={props.name} value={item.value} checked={props.value.includes(item.value)} />
                    {item.display}
                </label>
            )}
        </div>
    </>
}

export default memo(RadioGroup);