import { Field } from "formik";
import React, {memo} from "react";
import { InputControlProps } from "../form.field.interface";

const CheckBox: React.FC<InputControlProps> = ({
    ...props
}) => {
    return <>
        <label>
            <Field  {...props} type={props.type}
                name={props.name}
                value={props.dataToRender.value}
                checked={props.value===props.dataToRender.value} />
            {props.dataToRender.display}
        </label>
    </>
}

export default memo(CheckBox);