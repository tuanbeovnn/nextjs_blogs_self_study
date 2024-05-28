import React from 'react';
import { Control, useController } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Define the QuillEditorHookProps type
type QuillEditorHookProps = {
    control: Control<any>;
    name: string;
    label: string;
    modules?: object;
    formats?: string[];
};

const QuillEditorHook: React.FC<QuillEditorHookProps> = ({ control, name, label, modules, formats }) => {
    const { field, fieldState } = useController({
        name,
        control,
        defaultValue: '',
    });

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div className="appearance-none rounded w-full leading-tight focus:outline-none focus:shadow-outline h-60">
                <ReactQuill
                    value={field.value}
                    onChange={field.onChange}
                    modules={modules}
                    theme="snow"
                    formats={formats}
                    style={{ height: '200px' }}
                    className={`mt-1 w-full rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-40 ${fieldState.error ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
            </div>
            {fieldState.error && <span className="text-red-500 text-sm">{fieldState.error.message}</span>}
        </div>
    );
};

export default QuillEditorHook;
