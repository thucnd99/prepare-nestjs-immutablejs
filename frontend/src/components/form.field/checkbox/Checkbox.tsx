import { Field, FieldInputProps, FieldHelperProps } from "formik";
import React, {memo} from "react";
import { CustomFieldProps } from "../field.interface";

const CheckBox: React.FC<CustomFieldProps&FieldHelperProps<any>&FieldInputProps<any>> = ({
    ...props
}) => {
    return <>
        <label>
            <Field  {...props} type="checkbox"
                name={props.name}
                value={props.dataToRender.value}
                checked={props.value===props.dataToRender.value} />
            {props.dataToRender.display}
        </label>
    </>
}

export default memo(CheckBox);