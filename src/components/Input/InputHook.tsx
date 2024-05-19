import React from 'react';
import { Control, useController } from 'react-hook-form';

// Define the InputHookProps type with a generic type parameter for the element type
type InputHookProps<T extends HTMLElement = HTMLInputElement> = {
    control: Control<any>;
    name: string;
    label: string;
} & Omit<React.HTMLProps<T>, 'name' | 'defaultValue'>;

// Define the InputHook component
function InputHook<T extends HTMLElement = HTMLInputElement>({
    control,
    name,
    label,
    ...props
}: InputHookProps<T>) {

    const { field, fieldState } = useController({
        name: name,
        control: control,
        defaultValue: ''
    });

    return (
        <div className="mb-4">
            <label htmlFor={props.id || name} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                {...field}
                {...props as any}
                className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${fieldState.error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldState.error && <span className="text-red-500 text-sm">{fieldState.error.message}</span>}
        </div>
    );
}

export default InputHook;
