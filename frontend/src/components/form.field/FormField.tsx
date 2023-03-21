import { ErrorMessage, Field, FieldProps } from "formik";
import React from "react";
import CustomFormLabel from "../../themes/CustomFormLabel";
import { CustomFieldProps } from "./field.interface";
import "./FormField.scss"
import { SketchPicker } from "react-color";

const FormField: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const renderComponent = () => {
        if (["text", "email", "password", "textarea"].includes(props.type))
            return <Field {...field} {...props}
                className="form-item"
                name={field.name}
                type={props.type}
                placeholder={props.placeholder}
            />
        if (props.type === "select")
            return <>
                <Field className="form-item"
                    {...field} {...props}
                    type={props.type}
                    placeholder={props.placeholder}>
                    {props.dataToRender.map((v: any) =>
                        <option value={v.value} >{v.display}</option>
                    )}
                </Field>
            </>
        if (props.type === "colorPicker")
            return <>
                <SketchPicker color={values[field.name]} onChange={(color, event) => {
                    setFieldValue(field.name, color.hex, true)
                }} />
            </>
        if (props.type === "custom")
            return props.renderComponent;
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                {props.label && <CustomFormLabel aria-required={props.required} htmlFor={field.name}>{props.label}</CustomFormLabel>}
                {props.extra}
            </div>
            {props.renderComponent ? props.renderComponent : renderComponent()}
            {touched[`${field.name}`] && errors[`${field.name}`] && <ErrorMessage name={field.name}>{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>}
        </>

    );
}

export default FormField;