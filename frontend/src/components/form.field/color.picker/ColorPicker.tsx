import { Field, FieldProps } from 'formik';
import React, { memo } from 'react';
import { CustomFieldProps } from '../field.interface';
import { SketchPicker } from 'react-color';
import CustomButton from '../../../themes/CustomButton';
import { Popover } from 'antd';
import FlexDisplay from '../flex.display/Flex.Display';
import FormField from '../FormField';

const ColorPicker: React.FC<FieldProps & CustomFieldProps> = ({
    ...props
}) => {
    return <>
        <Popover content={<SketchPicker color={props.field.value} onChange={(color, event) => {
            props.form.setFieldValue(props.field.name, color.hex, true)
        }} />} title="Title" trigger="click">
            {props.field.value}
            <CustomButton style={{ margin: '10px 0' }} color={props.field.value}>Choose color </CustomButton>
        </Popover>
    </>
}

export default memo(ColorPicker);