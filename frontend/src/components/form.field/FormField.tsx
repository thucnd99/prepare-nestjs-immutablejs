import { ErrorMessage } from "formik";
import CustomFormLabel from "../../themes/CustomFormLabel";
import { FieldControlProps } from "./form.field.interface";
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
    control,
   ...props
}: FieldControlProps) => {
    const setInputType = (): InputType => {
        switch (control) {
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
        if (control === "custom")
            return props.renderComponent;
        if (Input != null)
            return <>
                <Input {...props} />
            </>
        else <></>
    }
    return (
        <>
            {!props.justDisplayControl && <FlexDisplay>
                {props.label && <CustomFormLabel aria-required={props.displayRequired} htmlFor={props.name}>{props.label}</CustomFormLabel>}
                <div>
                    {props.extra}
                </div>
            </FlexDisplay>}
            {props.renderComponent ? props.renderComponent : renderComponent()}
            {!props.justDisplayControl && <ErrorMessage name={props.name}>{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>}
        </>

    );
}

export default FormField;