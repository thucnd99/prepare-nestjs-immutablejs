import { FieldProps, Field, ErrorMessage } from "formik";
import React from "react";
import { CustomFieldProps } from "../field.interface";

const CheckBox: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <label>
            <Field  {...field} {...props} type="checkbox"
                name={field.name}
                value={props.dataToRender.value}
                checked={field.value===props.dataToRender.value} />
            {props.dataToRender.display}
        </label>
    </>
}

export default CheckBox;