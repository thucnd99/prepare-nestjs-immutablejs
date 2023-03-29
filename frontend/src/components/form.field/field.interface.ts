import React, { CSSProperties } from 'react';
import { CheckboxData } from './checkbox/checkbox.interface';
import { OptionData } from './select/select.interface';
import { RadioData } from './radio/radio.interface';
export interface CustomFieldProps {
    label?: string;
    required?: boolean;
    name: string;
    type: string;
    placeholder?: string;
    dataToRender?: CheckboxData[] | CheckboxData | OptionData[] | RadioData[] | RadioData | any;
    renderComponent?: React.ReactNode;
    extra?: React.ReactNode;
    style?: CSSProperties | undefined;
}