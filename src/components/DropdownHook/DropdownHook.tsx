import React from "react";
import { Control, useController } from "react-hook-form";

// Define the DropdownHookProps type with a generic type parameter for the element type
type DropdownHookProps = {
  control: Control<any>;
  name: string;
  label: string;
  options: { value: string; label: string }[];
} & Omit<React.HTMLProps<HTMLSelectElement>, "name" | "defaultValue">;

// Define the DropdownHook component
function DropdownHook({
  control,
  name,
  label,
  options,
  ...props
}: DropdownHookProps) {
  const { field, fieldState } = useController({
    name: name,
    control: control,
    defaultValue: "",
  });

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || name}
        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className={`shadow appearance-none border dark:border-borderDark rounded w-full dark:text-white p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${fieldState.error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {fieldState.error && (
        <span className="text-red-500 text-sm">{fieldState.error.message}</span>
      )}
    </div>
  );
}

export default DropdownHook;
