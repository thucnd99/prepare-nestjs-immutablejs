import React, { memo } from 'react';
import { FieldControlProps } from '../form.field.interface';
import { SketchPicker } from 'react-color';
import CustomButton from '../../../themes/CustomButton';
import { Popover } from 'antd';
import { useField } from 'formik';
import FormField from '../FormField';

const ColorPicker: React.FC<FieldControlProps> = ({
    ...props
}) => {
    const [field, meta, helper] = useField(props.name)
    const content = <SketchPicker color={field.value} onChange={(color, event) => {
        helper.setValue(color.hex)
    }} />
    const handleOpenAndTouched = (visible: boolean) => {
        if (meta.touched) return;
        if (visible) return;
        else helper.setTouched(true);
    }
    return <div>
        <FormField style={{
            minWidth: '50%', width: 'auto',
            borderRadius: '10px 0px 0px 10px'}} justDisplayControl={true} control={props.type} type={props.type} {...props} />
        <Popover onOpenChange={(v) => handleOpenAndTouched(v)} content={content} trigger={'click'}>
            <CustomButton
                style={{
                    height: '100%',
                    padding: `1em`,
                    minWidth: '20%',
                    width: 'fit-content',
                    borderRadius: '0px 10px 10px 0px',
                }}
                type="button"
                color={field.value}>Choose color </CustomButton>
        </Popover>
    </div>
}

export default memo(ColorPicker);