import { PostType } from "@/types";
import Link from 'next/link';
import React from "react";
import { Author } from "../Author";
import { Badge } from "../Badge";

interface PostProps {
    post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="md:p-4 p-2.5 border border-[#E8E8EA] rounded-xl h-full">
            <div className="relative block pt-[67%]">
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-lg"
                    src="https://picsum.photos/seed/picsum/400/500"
                    alt=""
                />
            </div>

            <div className="mt-4 p-2">
                <Badge mode="outline" label={post?.category.name} />
                <Link
                    href={`/blog/${post?.id}`}
                    className="md:text-2xl text-lg text-[#181A2A] font-semibold line-clamp-3 mb-5 my-4 h-24 no-underline hover:underline"
                >
                    {post?.title}
                </Link>
                <Author
                    avatar="https://picsum.photos/seed/picsum/400/500"
                    name={post?.createdBy.name}
                    createdAt={post?.createdDate}
                    id={post?.createdBy.id}
                />

            </div>
        </div>
    );
};

export default Post;
