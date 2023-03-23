import { ErrorMessage, FieldProps } from "formik";
import React from "react";
import CustomFormLabel from "../../themes/CustomFormLabel";
import { CustomFieldProps } from "./field.interface";
import "./FormField.scss"
import { CheckBox, CheckBoxGroup, ColorPicker, CustomInput, Radio, RadioGroup, Select, TextArea } from ".";
const FormField: React.FC<FieldProps & CustomFieldProps> = ({
    type,
    ...props
}) => {
    let SInput = () => {
        
    }
    const renderComponent = () => {
        if (["text", "email", "password"].includes(type))
            return <CustomInput {...props} type={type} />
        if (type === "select" && props.dataToRender)
            return <>
                <Select {...props} type={type} />
            </>
        if (type === "textarea")
            return <>
                <TextArea {...props} type={type} />
            </>
        if (type === 'checkbox')
            return <CheckBox {...props} type={type} />
        if (type === 'checkboxgroup' && props.dataToRender)
            return <>
                <CheckBoxGroup {...props} type={type} />
            </>
        if (type === 'radio')
            return <Radio {...props} type={type} />
        if (type === 'radiogroup' && props.dataToRender)
            return <>
                <RadioGroup {...props} type={type} />
            </>
        if (type === "colorPicker")
            return <>
                <ColorPicker {...props} type={type} />
            </>
        if (type === "custom")
            return props.renderComponent;
    }
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
                {props.label && <CustomFormLabel aria-required={props.required} htmlFor={props.field.name}>{props.label}</CustomFormLabel>}
                <div>
                    {props.extra}
                </div>
            </div>
            {props.renderComponent ? props.renderComponent : renderComponent()}
            <ErrorMessage name={`${props.field.name}`}>{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>
        </>

    );
}

export default FormField;