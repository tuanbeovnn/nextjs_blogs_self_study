import { ListPost } from "@/components";
import React from "react";

const AuthorDetail = () => {
    return (
        <div className="max-w-7xl mx-auto md:px-8 px-4">
            <div className="md:p-12 p-6 mb-12 text-center rounded-xl bg-[#F6F6F7]">
                <div className="max-w-2xl mx-auto">
                    <div className="flex gap-4 items-center justify-center">
                        <img
                            src="https://source.unsplash.com/random"
                            className="w-16 h-16 rounded-full"
                            alt=""
                        />
                        <div>
                            <div className="text-xl text-[#181A2A] font-medium">
                                Jonathan Doe
                            </div>
                            <div className="text-sm text-[#696A75]">
                                Collaborator & Editor
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-lg text-[#3B3C4A] my-6">
                        Meet Jonathan Doe, a passionate writer and blogger with a love for
                        technology and travel. Jonathan holds a degree in Computer Science
                        and has spent years working in the tech industry, gaining a deep
                        understanding of the impact technology has on our lives.
                    </p>
                </div>
                <div className="flex items-center gap-2 justify-center">
                    <div className="w-8 h-8 rounded-md bg-[#696A75] inline-flex items-center justify-center">
                        <span className="text-base text-white">A</span>
                    </div>
                    <div className="w-8 h-8 rounded-md bg-[#696A75] inline-flex items-center justify-center">
                        <span className="text-base text-white">A</span>
                    </div>
                    <div className="w-8 h-8 rounded-md bg-[#696A75] inline-flex items-center justify-center">
                        <span className="text-base text-white">A</span>
                    </div>
                    <div className="w-8 h-8 rounded-md bg-[#696A75] inline-flex items-center justify-center">
                        <span className="text-base text-white">A</span>
                    </div>
                </div>
            </div>

            <div className="md:pb-24 pb-10">
                <div className="text-2xl text-[#181A2A] font-bold mb-8">
                    Latest Post
                </div>

                <ListPost />
            </div>
        </div>
    );
};

export default AuthorDetail;
