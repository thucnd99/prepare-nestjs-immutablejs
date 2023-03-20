import { FieldAttributes } from 'formik';
import React from 'react';
export interface FieldProps {
    label?: string;
    required?: boolean;
    name: string;
    type: string;
    placeholder?: string;
    dataToRender?: any;
    renderComponent?: React.ReactNode;
    onChange?: React.ChangeEventHandler;
}