import { Field } from "formik";
import React, {memo} from "react";
import { InputControlProps } from "../form.field.interface";
import { CheckboxData } from "./checkbox.interface";
const CheckBoxGroup: React.FC<InputControlProps> = ({
    ...props
}) => {
    return <>
        <div role="group" aria-labelledby="checkbox-group">
            {props.dataToRender.map((item: CheckboxData) =>
                <label>
                    <Field  {...props} type={props.type}
                        name={props.name}
                        checked={props.value.includes(item.value)}
                        value={item.value} />
                    {item.display}
                </label>
            )}
        </div>
    </>
}

export default memo(CheckBoxGroup);