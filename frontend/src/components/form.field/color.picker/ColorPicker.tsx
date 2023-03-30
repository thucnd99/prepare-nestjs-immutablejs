import React, { memo } from 'react';
import { InputControlProps } from '../form.field.interface';
import { SketchPicker } from 'react-color';
import CustomButton from '../../../themes/CustomButton';
import { Popover } from 'antd';
import Input from '../Input';

const ColorPicker: React.FC<InputControlProps> = ({
    touched,
    ...props
}) => {
    const content = <SketchPicker color={props.value} onChange={(color, event) => {
        props.setValue(color.hex)
    }} />
    const handleOpenAndTouched = (visible: boolean) => {
        if (touched) return;
        if(visible) return;
        else props.setTouched(true);
    }
    return <>
        <Input style={{ width: `80%`, float: 'left', borderRadius: '10px 0px 0px 10px', }} touched {...props} />
        <Popover trigger="click" onOpenChange={(v) => handleOpenAndTouched(v)} content={content} title="Title">
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
    </>
}

export default memo(ColorPicker);