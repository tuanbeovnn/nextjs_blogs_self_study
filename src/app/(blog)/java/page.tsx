import { Badge, Author, ListPost, Ads } from "@/components";
import Link from "next/link";
import React from "react";


const Blog = () => {
    return (
        <div className="max-w-7xl mx-auto md:px-8 px-4">
            <div className="py-4 text-center md:mb-12 mb-4">
                <h1 className="text-3xl text-[#181A2A] font-semibold">Page Title</h1>
                <div className="flex items-center justify-center mt-2">
                    <Link href="/" className="text-base text-[#3B3C4A]">
                        Home
                    </Link>
                    <div className="mx-3 h-4 w-[1px] bg-[#E8E8EA]" />
                    <Link href="/blog" className="text-base font-medium text-[#3B3C4A]">
                        Blog
                    </Link>
                </div>
            </div>
            <div
                style={{
                    backgroundImage:
                        "linear-gradient(0deg, rgba(20, 22, 36, 0.4), rgba(20, 22, 36, 0.4)), url(https://source.unsplash.com/random)",
                }}
                className="relative h-[450px] w-full bg-center bg-cover rounded-xl flex items-end"
            >
                <div className="p-10">
                    <Badge label="Technology" />
                    <h2 className="max-w-[720px] text-4xl text-white font-semibold mt-4 mb-6">
                        The Impact of Technology on the Workplace: How Technology is
                        Changing
                    </h2>
                    <Author
                        avatar="https://source.unsplash.com/random"
                        name="Tracey Wilson"
                        createdAt="August 20, 2022"
                        light
                    />
                </div>
            </div>

            <div className="md:pt-12 pt-4">
                <ListPost />
                <div className="md:my-20 my-8">
                    <Ads />
                </div>
            </div>
        </div>
    );
};

export default Blog;
