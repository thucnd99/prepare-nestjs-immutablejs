import React from 'react';
import { CheckboxData } from './checkbox.interface';
import { OptionData } from './select.interface';
import { RadioData } from './radio.interface';
export interface CustomFieldProps {
    label?: string;
    required?: boolean;
    // name: string;
    type: string;
    placeholder?: string;
    dataToRender?: CheckboxData[] | OptionData[] | RadioData[] | any;
    renderComponent?: React.ReactNode;
    // onChange?: React.ChangeEventHandler;
    extra?: React.ReactNode;
}