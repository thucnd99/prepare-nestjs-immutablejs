import { FieldProps } from 'formik';
import React, {memo} from 'react';
import { CustomFieldProps } from '../field.interface';
import { SketchPicker } from 'react-color';
import CustomButton from '../../../themes/CustomButton';
import { Popover } from 'antd';

const ColorPicker: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <Popover content={<SketchPicker color={values[field.name]} onChange={(color, event) => {
            setFieldValue(field.name, color.hex, true)
        }} />} title="Title" trigger="click">
            <CustomButton style={{margin:'10px 0'}} color={values[field.name]}>Choose color </CustomButton>
        </Popover>
    </>
}

export default memo(ColorPicker);