import { ErrorMessage } from "formik";
import React, { HTMLInputTypeAttribute } from "react";
import CustomFormikField from "../../themes/CustomFormItem";
import CustomFormLabel from "../../themes/CustomFormLabel";

interface FieldProps {
    label?: string;
    required?: boolean;
    name: string;
    type: string;
    placeholder?: string;
    dataToRender?: any;
    renderComponent?: React.ReactNode;
    onChange?: React.ChangeEventHandler;
}

const FormField: React.FC<FieldProps> = (props: FieldProps) => {
    const renderComponent = () => {
        if (["text", "email", "password", "textarea"].includes(props.type))
            return <CustomFormikField
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
            />
        if (props.type === "select")
            return <>
                <CustomFormikField
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder} />
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