import { PostType } from "@/types";
import Link from 'next/link';
import React from "react";
import { Author } from "../Author";
import { Badge } from "../Badge";
import { usePathname } from "next/navigation";

interface PostProps {
    post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {

    const pathname = usePathname();
    const segments = pathname.split('/');
    const categoryName = segments[segments.length - 1]
    const href = segments[segments.length - 2] === "category" ? `/blog/category/${categoryName}/details/${post?.id}` : `/blog/details/${post?.id}`;


    const randomImageUrl = `https://source.unsplash.com/random?sig=${Math.floor(
        Math.random() * 2000
    )}`;
    return (
        <div className="md:p-4 p-2.5 border border-[#E8E8EA] rounded-xl h-full">
            <div className="relative block pt-[67%] transition-transform duration-200 overflow-hidden group">
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-lg group-hover:scale-110 duration-150"
                    src={randomImageUrl}
                    alt=""
                />
            </div>

            <div className="mt-4 p-2">
                <Badge mode="outline" label={post?.category.name} />
                <Link
                    href={href}
                    className="md:text-2xl text-lg text-[#181A2A] font-semibold line-clamp-3 mb-5 my-4 h-24 no-underline hover:underline"
                >
                    {post?.title}
                </Link>
                <Author
                    avatar={randomImageUrl}
                    name={post?.createdBy.name}
                    createdAt={post?.createdDate}
                    id={post?.createdBy.id}
                />

            </div>
        </div>
    );
};

export default Post;
