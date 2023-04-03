import React, { memo, useEffect } from 'react';
import { FieldControlProps } from '../form.field.interface';
import { SketchPicker } from 'react-color';
import CustomButton from '../../../themes/CustomButton';
import { Button, Popover, Tooltip } from 'antd';
import Input from '../Input';
import { useField } from 'formik';

const ColorPicker: React.FC<FieldControlProps> = ({
    ...props
}) => {
    useEffect(() => {
        document.documentElement.scrollTop = document.documentElement.clientHeight;
        document.documentElement.scrollLeft = document.documentElement.clientWidth;
      }, []);
    const [field, meta, helper] = useField(props.name)
    const content = <SketchPicker color={field.value} onChange={(color, event) => {
        helper.setValue(color.hex)
    }} />
    const handleOpenAndTouched = (visible: boolean) => {
        if (meta.touched) return;
        if (visible) return;
        else helper.setTouched(true);
    }
    return <div style={{display: 'flex',
        flexFlow: 'row wrap'}}>
        <Input style={{
            maxWidth: `80%`,
            minWidth: `50%`,
            width: 'auto',
            borderRadius: '10px 0px 0px 10px'}} {...props} />
        <Popover onOpenChange={(v) => handleOpenAndTouched(v)} content={content}>
            <CustomButton
                style={{
                    height: '100%',
                    padding: `1em`,
                    minWidth: '20%',
                    width: 'fit-content',
                    borderRadius: '0px 10px 10px 0px',
                }}
                color={field.value}>Choose color </CustomButton>
        </Popover>
    </div>
}

export default memo(ColorPicker);