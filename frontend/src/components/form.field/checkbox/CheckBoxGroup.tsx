import { FieldProps, Field } from "formik";
import React from "react";
import { CustomFieldProps } from "../field.interface";
import { CheckboxData } from "./checkbox.interface";
const CheckBoxGroup: React.FC<FieldProps & CustomFieldProps> = ({
    field,
    form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <div role="group" aria-labelledby="checkbox-group">
            {props.dataToRender.map((item: CheckboxData) =>
                <label>
                    <Field  {...field} {...props} type="checkbox"
                        name={field.name}
                        checked={field.value.includes(item.value)}
                        value={item.value} />
                    {item.display}
                </label>
            )}
        </div>
    </>
}

export default CheckBoxGroup;