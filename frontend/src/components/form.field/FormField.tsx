import { ErrorMessage, useField } from "formik";
import CustomFormLabel from "../../themes/CustomFormLabel";
import { CustomFieldProps } from "./field.interface";
import "./FormField.scss"
import { CheckBox, CheckBoxGroup, ColorPicker, CustomInput, Radio, RadioGroup, Select, TextArea } from ".";
import { InputTypes } from "./InputType";
import FlexDisplay from "./flex.display/Flex.Display";

type InputType = typeof CheckBox |
    typeof CheckBoxGroup |
    typeof ColorPicker |
    typeof CustomInput |
    typeof Radio |
    typeof RadioGroup |
    typeof Select |
    typeof TextArea | null

const FormField = ({
    type,
   ...props
}: CustomFieldProps) => {
    const [field, meta, helper] = useField(props)
    const setInputType = (): InputType => {
        switch (type) {
            case InputTypes.TEXT: case InputTypes.EMAIL: case InputTypes.PASSWORD:
                return CustomInput;
            case InputTypes.SELECT:
                return Select;
            case InputTypes.TEXTAREA:
                return TextArea;
            case InputTypes.CHECKBOX:
                return CheckBox;
            case InputTypes.CHECKBOXGROUP:
                return CheckBoxGroup;
            case InputTypes.RADIO:
                return Radio;
            case InputTypes.RADIOGROUP:
                return RadioGroup;
            case InputTypes.COLORPICKER:
                return ColorPicker;
            default:
                return null;
        }
    }
    const Input: InputType = setInputType()

    const renderComponent = () => {
        if (type === "custom")
            return props.renderComponent;
        if (Input != null)
            return <>
                <Input type={type} {...props} {...field} {...helper} />
            </>
        else <></>
    }
    return (
        <>
            <FlexDisplay>
                {props.label && <CustomFormLabel aria-required={props.required} htmlFor={field.name}>{props.label}</CustomFormLabel>}
                <div>
                    {props.extra}
                </div>
            </FlexDisplay>
            {props.renderComponent ? props.renderComponent : renderComponent()}
            <ErrorMessage name={`${field.name}`}>{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>
        </>

    );
}

export default FormField;