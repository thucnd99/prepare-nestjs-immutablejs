import { FieldProps } from 'formik';
import React from 'react';
import { CustomFieldProps } from '../field.interface';
import { SketchPicker } from 'react-color';

const ColorPicker: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <SketchPicker color={values[field.name]} onChange={(color, event) => {
            setFieldValue(field.name, color.hex, true)
        }} />
    </>
}

export default ColorPicker;