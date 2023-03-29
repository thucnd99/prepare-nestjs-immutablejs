import { FieldHelperProps, FieldInputProps } from 'formik';
import React, { memo } from 'react';
import { CustomFieldProps } from '../field.interface';
import { SketchPicker } from 'react-color';
import CustomButton from '../../../themes/CustomButton';
import { Popover } from 'antd';
import Input from '../Input';

const ColorPicker: React.FC<CustomFieldProps&FieldInputProps<any>&FieldHelperProps<any>> = ({
    ...props
}) => {
    return <>
        <div>
            <Input style={{ width: `80%`, float: 'left', borderRadius: '10px 0px 0px 10px', }} {...props} />
            <Popover content={<SketchPicker color={props.value} onChange={(color, event) => {
                props.setValue(color.hex)
            }} />} title="Title" trigger="click">
                <CustomButton
                    style={{
                        height: '100%',
                        padding: `1em`,
                        width: '20%',
                        float: 'right',
                        borderRadius: '0px 10px 10px 0px',
                        boxSizing: 'border-box',
                        
                    }}
                    color={props.value}>Choose color </CustomButton>
            </Popover>
        </div>
    </>
}

export default memo(ColorPicker);