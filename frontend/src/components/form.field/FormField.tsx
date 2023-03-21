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
    field,
    ...props
}) => {
    const renderComponent = () => {
        if (["text", "email", "password"].includes(props.type))
            return  <Input {...field} {...props} field={field} type={props.type} />
        if (props.type === "select" && props.dataToRender)
            return <>
                <Select {...field} {...props} field={field} type={props.type} />
            </>
        if (props.type === "textarea")
            return <>
                <TextArea {...field} {...props} field={field} type={props.type} />
            </>
        if(props.type === 'checkbox')
            return <CheckBox {...field} {...props} field={field} type={props.type}  />
        if (props.type === 'checkboxgroup' && props.dataToRender)
            return <>
                <CheckBoxGroup {...field} {...props} field={field} type={props.type}  />
            </>
        if(props.type === 'radio')
            return <Radio {...field} {...props} field={field} type={props.type}  />
        if (props.type === 'radiogroup' && props.dataToRender)
            return <>
                <RadioGroup {...field} {...props} field={field} type={props.type} />
            </>
        if (props.type === "colorPicker")
            return <>
                <ColorPicker {...field} {...props} field={field} type={props.type} />
            </>
        if (props.type === "custom")
            return props.renderComponent;
    }
    if(field.name===`feedPosts[3].body`) {
        console.log("ac to arr[3]")
        console.log(props.form.touched[field.name])
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                {props.label && <CustomFormLabel aria-required={props.required} htmlFor={field.name}>{props.label}</CustomFormLabel>}
                {props.extra}
            </div>
            {props.renderComponent ? props.renderComponent : renderComponent()}
            <ErrorMessage name={`${field.name}`}>{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>
        </>

    );
}

export default FormField;