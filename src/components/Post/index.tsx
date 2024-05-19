import React from "react";
import { Badge  } from "../Badge";
import { Author } from "../Author";
import Link from 'next/link';

export const Post = () => {
    return (
        <div className="md:p-4 p-2.5 border border-[#E8E8EA] rounded-xl">
            <Link href={`/blog/:id`} className="relative block pt-[67%]">
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-lg"
                    src="https://source.unsplash.com/random"
                    alt=""
                />
            </Link>

            <div className="mt-4 p-2">
                <Badge mode="outline" label="Technology" />
                <Link
                    href={`/blog/:id`}
                    className="md:text-2xl text-lg text-[#181A2A] font-semibold line-clamp-3 mb-5 my-4"
                >
                    The Impact of Technology on the Workplace: How Technology is Changing
                </Link>
                <Author
                    avatar="https://images2.thanhnien.vn/Uploaded/minhnguyet/2021_11_11/trieu-lo-tu-217.jpg"
                    name="Triệu Lộ Tư"
                    createdAt="09/11/1998"
                />
            </div>
        </div>
    );
};

export default Post;
