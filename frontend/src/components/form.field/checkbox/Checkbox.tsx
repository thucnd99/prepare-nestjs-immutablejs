import { FieldProps, Field, ErrorMessage } from "formik";
import React, {memo} from "react";
import { CustomFieldProps } from "../field.interface";

const CheckBox: React.FC<FieldProps & CustomFieldProps> = ({
    ...props
}) => {
    return <>
        <label>
            <Field  {...props} type="checkbox"
                name={props.field.name}
                value={props.dataToRender.value}
                checked={props.field.value===props.dataToRender.value} />
            {props.dataToRender.display}
        </label>
    </>
}

export default memo(CheckBox);