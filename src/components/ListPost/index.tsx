import React from "react";
import Post from "../Post";

export const ListPost = () => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array(9)
                    .fill(0)
                    .map((_, index) => (
                        <Post key={index} />
                    ))}
            </div>
            <button className="md:mt-8 mt-4 mx-auto px-5 py-3 flex items-center gap-3 h-12 border border-[#696A75]/30 rounded-md font-medium font-base text-[#696A75]">
                View All Post
            </button>
        </div>
    );
};

