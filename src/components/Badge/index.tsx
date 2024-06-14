import React from "react";
// mode = outline | contained

interface Props {
    mode?:string,
    label:string
}

export const Badge = ({ mode, label }:Props) => {
    return (
        <div
            className={`inline-flex items-center justify-center rounded-md py-1 px-2.5 gap-1 ${mode === "outline" ? "bg-primary/5" : "bg-primary"
                }`}
        >
            <span
                className={`text-sm font-medium ${mode === "outline" ? "text-primary" : "text-white"
                    }`}
            >
                {label}
            </span>
        </div>
    );
};
