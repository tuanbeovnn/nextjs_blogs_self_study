import React from "react";
import { Control, useController } from "react-hook-form";

// Define the InputHookProps type with a generic type parameter for the element type
type CheckBoxHookProps<T extends HTMLElement = HTMLInputElement> = {
  control: Control<any>;
  text: string;
  name: string;
} & Omit<React.HTMLProps<T>, "text" | "defaultValue">;

// Define the CheckBoxHook component
function CheckBoxHook<T extends HTMLElement = HTMLInputElement>({
  control,
  ...props
}: CheckBoxHookProps<T>) {
  const { field, fieldState } = useController({
    name: props.name,
    control: control,
    defaultValue: false,
  });

  return (
    <div className="mb-4">
      <div className="flex items-center cursor-pointer">
        <input
          {...field}
          {...(props as any)}
          checked={field.value}
          type="checkbox"
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${fieldState.error ? "border-red-500" : ""}`}
        />
        <label
          htmlFor={props.id || props.name}
          className="ml-2 block text-sm text-gray-900 dark:text-desc cursor-pointer"
        >
          {props.text}
        </label>
      </div>
      {fieldState.error && (
        <span className="text-red-500 text-sm">{fieldState.error.message}</span>
      )}
    </div>
  );
}

export default CheckBoxHook;
