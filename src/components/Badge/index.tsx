import React from "react";
// mode = outline | contained

interface Props {
    mode?:string,
    label:string
}

export const Badge = ({ mode, label }:Props) => {
    return (
        <div
            className={`inline-flex items-center justify-center rounded-md py-1 px-2.5 gap-1 ${mode === "outline" ? "bg-[#4B6BFB]/5" : "bg-[#4B6BFB]"
                }`}
        >
            <span
                className={`text-sm font-medium ${mode === "outline" ? "text-[#4B6BFB]" : "text-white"
                    }`}
            >
                {label}
            </span>
        </div>
    );
};
