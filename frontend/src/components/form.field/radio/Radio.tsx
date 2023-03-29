import { Field } from 'formik';
import React, {memo} from 'react';
import { InputControlProps } from '../form.field.interface';

const Radio: React.FC<InputControlProps> = ({
    ...props
}) => {
    return <>
        <label>
            <Field {...props} type={props.type} name={props.name} checked={props.value === props.dataToRender.value} value={props.dataToRender.value} />
            {props.dataToRender.display}
        </label>
    </>
}

export default memo(Radio);