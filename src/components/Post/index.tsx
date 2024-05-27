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
                    src="https://source.unsplash.com/random"
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
                    avatar="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    name={post?.createdBy.name}
                    createdAt={post?.createdDate}
                />

            </div>
        </div>
    );
};

export default Post;
