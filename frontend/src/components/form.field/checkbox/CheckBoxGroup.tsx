import { FieldProps, Field } from "formik";
import React, {memo} from "react";
import { CustomFieldProps } from "../field.interface";
import { CheckboxData } from "./checkbox.interface";
const CheckBoxGroup: React.FC<FieldProps & CustomFieldProps> = ({
    ...props
}) => {
    return <>
        <div role="group" aria-labelledby="checkbox-group">
            {props.dataToRender.map((item: CheckboxData) =>
                <label>
                    <Field  {...props} type={props.type}
                        name={props.field.name}
                        checked={props.field.value.includes(item.value)}
                        value={item.value} />
                    {item.display}
                </label>
            )}
        </div>
    </>
}

export default memo(CheckBoxGroup);