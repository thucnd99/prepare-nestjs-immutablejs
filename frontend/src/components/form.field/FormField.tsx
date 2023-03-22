import { ErrorMessage, FieldProps } from "formik";
import React from "react";
import CustomFormLabel from "../../themes/CustomFormLabel";
import { CustomFieldProps } from "./field.interface";
import "./FormField.scss"
import Input from "./Input";
import Select from "./select/Select";
import TextArea from "./textarea/Textarea";
import CheckBoxGroup from "./checkbox/CheckBoxGroup";
import RadioGroup from "./radio/RadioGroup";
import ColorPicker from "./color.picker/ColorPicker";
import CheckBox from "./checkbox/Checkbox";
import Radio from "./radio/Radio";

const FormField: React.FC<FieldProps & CustomFieldProps> = ({
    type,
    ...props
}) => {
    const renderComponent = () => {
        if (["text", "email", "password"].includes(type))
            return <Input {...props} type={type} />
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