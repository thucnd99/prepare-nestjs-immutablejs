import React from 'react';
import { CheckboxData } from './checkbox/checkbox.interface';
import { OptionData } from './select/select.interface';
import { RadioData } from './radio/radio.interface';
import { FieldInputProps, FieldHelperProps, FieldAttributes, FieldMetaProps } from 'formik';
export interface FieldControlProps extends FieldAttributes<any> {
    label?: string;
    required?: boolean;
    name: string;
    control?: string;
    type?: string;
    placeholder?: string;
    dataToRender?: CheckboxData[] | CheckboxData | OptionData[] | RadioData[] | RadioData | any;
    renderComponent?: React.ReactNode;
    extra?: React.ReactNode;
}

export interface InputControlProps extends FieldControlProps, FieldInputProps<any>, FieldHelperProps<any>, FieldMetaProps<any> {}