import { ErrorMessage, Field } from "formik";
import React from "react";
import CustomFormLabel from "../../themes/CustomFormLabel";
import { FieldProps } from "./field.interface";
import "./FormField.scss"
import { SketchPicker } from "react-color";

const FormField: React.FC<FieldProps> = (props: FieldProps) => {
    const renderComponent = () => {
        if (["text", "email", "password", "textarea"].includes(props.type))
            return <Field
                className="form-item"
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
            />
        if (props.type === "select")
            return <>
                <Field className="form-item"
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder}>
                    {props.dataToRender.map((v: any) =>
                        <option value={v.value} >{v.display}</option>
                    )}
                </Field>
            </>
        if (props.type === "custom")
            return props.renderComponent;
    }
    return (
        <>
            {props.label && <CustomFormLabel aria-required={props.required} htmlFor={props.name}>{props.label}</CustomFormLabel>}
            {props.renderComponent ? props.renderComponent : renderComponent()}
            <ErrorMessage name={props.name}>{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>
        </>

    );
}

export default FormField;