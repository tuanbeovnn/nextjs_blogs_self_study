import React from 'react';
import { Control, useController } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Define the QuillEditorHookProps type
type QuillEditorHookProps = {
    label: string;
    onChange?: (value: string) => void;
    value?: string;
    formats?: string[];
    modules?: object;
};

const QuillEditorHook: React.FC<QuillEditorHookProps> = ({ label, formats, onChange, value, modules }) => {


    const convertBase64ToFile = async (base64: string) => {
        const blob = await (await fetch(base64)).blob();
        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg', lastModified: new Date().getTime() });
        console.log(file)
        const formData = new FormData()
        formData.append("files", file)
        return formData;
    }

    // await uploadFilePhoto(formData)
    //             .then((res) => {
    //                 const response = res?.data?.data
    //                 if (response) {
    //                     const clearData = data.replace(getBase64, response?.fullUrl);

    //                     setIsLoading(false);
    //                 }
    //                 setIsLoading(false)
    //             })
    //             .catch(() => {
    //                 setIsLoading(false)


    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div className="appearance-none rounded w-full leading-tight focus:outline-none focus:shadow-outline h-60">
                <ReactQuill
                    value={value}
                    onChange={(value) => {
                        const getBase64 = value?.match(/data:image([\w\W]+?)"/g)?.[0].replace('"', '');
                        if (getBase64) {
                            convertBase64ToFile(getBase64)
                        }
                        if (onChange) {
                            onChange(value);
                        }
                    }}

                    theme="snow"
                    formats={formats}
                    style={{ height: '200px' }}
                    modules={modules}
                // className={`mt-1 w-full rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-40 ${fieldState.error ? 'border-red-500' : 'border-gray-300'
                //     }`}
                />
            </div>
            {/* {fieldState.error && <span className="text-red-500 text-sm">{fieldState.error.message}</span>} */}
        </div>
    );
};

export default QuillEditorHook;
