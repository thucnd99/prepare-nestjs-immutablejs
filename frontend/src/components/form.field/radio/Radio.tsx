import { Field, FieldHelperProps, FieldInputProps } from 'formik';
import React, {memo} from 'react';
import { CustomFieldProps } from '../field.interface';

const Radio: React.FC<CustomFieldProps&FieldHelperProps<any>&FieldInputProps<any>> = ({
    ...props
}) => {
    return <>
        <label>
            <Field {...props} type="radio" name={props.name} checked={props.value === props.dataToRender.value} value={props.dataToRender.value} />
            {props.dataToRender.display}
        </label>
    </>
}

export default memo(Radio);