import React from 'react';
export interface CustomFieldProps {
    label?: string;
    required?: boolean;
    // name: string;
    type: string;
    placeholder?: string;
    dataToRender?: any;
    renderComponent?: React.ReactNode;
    // onChange?: React.ChangeEventHandler;
}