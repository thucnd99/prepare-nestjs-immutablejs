import React, { CSSProperties } from 'react';
import { CheckboxData } from './checkbox/checkbox.interface';
import { OptionData } from './select/select.interface';
import { RadioData } from './radio/radio.interface';
import { FieldInputProps, FieldHelperProps } from 'formik';
export interface FieldControlProps {
    label?: string;
    required?: boolean;
    name: string;
    control?: string;
    type?: string;
    placeholder?: string;
    dataToRender?: CheckboxData[] | CheckboxData | OptionData[] | RadioData[] | RadioData | any;
    renderComponent?: React.ReactNode;
    extra?: React.ReactNode;
    style?: CSSProperties | undefined;
}

export interface InputControlProps extends FieldControlProps, FieldInputProps<any>, FieldHelperProps<any> {}