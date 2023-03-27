import { Field, FieldProps } from 'formik';
import React, {memo} from 'react';
import { CustomFieldProps } from '../field.interface';

const Radio: React.FC<FieldProps & CustomFieldProps> = ({
    ...props
}) => {
    return <>
        <label>
            <Field {...props} type="radio" name={props.field.name} checked={props.field.value === props.dataToRender.value} value={props.dataToRender.value} />
            {props.dataToRender.display}
        </label>
    </>
}

export default memo(Radio);